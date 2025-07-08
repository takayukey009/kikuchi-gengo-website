// Mode Switcher for Day/Night Restaurant Operations
class ModeSwitcher {
    constructor() {
        this.currentMode = 'day';
        this.nightMenuData = null;
        this.init();
    }

    async init() {
        await this.loadNightMenuData();
        this.setupModeButtons();
        this.setupOperatingStatus();
        this.determineInitialMode();
        this.startStatusUpdater();
    }

    async loadNightMenuData() {
        try {
            const response = await fetch('/data/night-menu.json');
            this.nightMenuData = await response.json();
        } catch (error) {
            console.error('Failed to load night menu data:', error);
        }
    }

    setupModeButtons() {
        const modeSwitcher = document.querySelector('.mode-switcher');
        if (modeSwitcher) {
            modeSwitcher.addEventListener('click', (e) => {
                if (e.target.classList.contains('mode-btn')) {
                    const mode = e.target.dataset.mode;
                    this.switchMode(mode);
                }
            });
        }
    }

    setupOperatingStatus() {
        // Operating status will be updated by startStatusUpdater
    }

    determineInitialMode() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Check if currently operating and in which mode
        const operatingInfo = this.getOperatingInfo(now);
        
        if (operatingInfo.isOpen && operatingInfo.mode === 'night') {
            this.switchMode('night');
        } else {
            this.switchMode('day');
        }
    }

    getOperatingInfo(date = new Date()) {
        const hour = date.getHours();
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Tuesday is closed (day 2)
        if (day === 2) {
            return { isOpen: false, mode: null, status: 'closed' };
        }

        let isOpen = false;
        let mode = 'day';
        let status = 'closed';

        if (day === 0) { // Sunday
            if (hour >= 11 && hour < 18) {
                isOpen = true;
                mode = 'day';
                status = 'open-day';
            }
        } else if (day === 6) { // Saturday
            if (hour >= 11 && hour < 17) {
                isOpen = true;
                mode = 'day';
                status = 'open-day';
            } else if (hour >= 17 && hour < 21) {
                isOpen = true;
                mode = 'night';
                status = 'open-night';
            }
        } else { // Weekdays (Monday, Wednesday-Friday)
            if (hour >= 11 && hour < 14) {
                isOpen = true;
                mode = 'day';
                status = 'open-day';
            } else if (hour >= 17 && hour < 21) {
                isOpen = true;
                mode = 'night';
                status = 'open-night';
            }
        }

        // Check for transition periods (30 minutes before opening)
        const isTransition = this.isTransitionPeriod(date);
        if (isTransition) {
            status = 'changing';
        }

        return { isOpen, mode, status };
    }

    isTransitionPeriod(date) {
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = date.getDay();

        // 30 minutes before opening times
        if (day === 2) return false; // Tuesday closed

        const transitionTimes = [];
        
        if (day === 0) { // Sunday
            transitionTimes.push({ hour: 10, minute: 30 }); // Before 11:00
        } else if (day === 6) { // Saturday
            transitionTimes.push({ hour: 10, minute: 30 }); // Before 11:00
            transitionTimes.push({ hour: 16, minute: 30 }); // Before 17:00
        } else { // Weekdays
            transitionTimes.push({ hour: 10, minute: 30 }); // Before 11:00
            transitionTimes.push({ hour: 16, minute: 30 }); // Before 17:00
        }

        return transitionTimes.some(time => 
            hour === time.hour && minute >= time.minute
        );
    }

    switchMode(mode) {
        if (this.currentMode === mode) return;

        this.currentMode = mode;
        document.body.classList.toggle('night-mode', mode === 'night');
        
        this.updateModeButtons();
        this.updateHeroSection();
        this.updateMenuSection();
        this.updateAccessSection();
        
        // Store preference in session
        sessionStorage.setItem('preferredMode', mode);
    }

    updateModeButtons() {
        const buttons = document.querySelectorAll('.mode-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
        });
    }
    
    updateHeroSection() {
        // 昼夜モードに応じてヒーローセクションのタイトルを切り替える
        const isNightMode = this.currentMode === 'night';
        
        // 昼モードのタイトル要素
        const dayTitle = document.querySelector('.day-title');
        const dayShopName = document.querySelector('.day-shop-name');
        const daySubtitle = document.querySelector('.day-subtitle');
        
        // 夜モードのタイトル要素
        const nightTitle = document.querySelector('.night-title');
        const nightShopName = document.querySelector('.night-shop-name');
        const nightSubtitle = document.querySelector('.night-subtitle');
        
        if (dayTitle && nightTitle) {
            dayTitle.style.display = isNightMode ? 'none' : 'block';
            nightTitle.style.display = isNightMode ? 'block' : 'none';
        }
        
        if (dayShopName && nightShopName) {
            dayShopName.style.display = isNightMode ? 'none' : 'block';
            nightShopName.style.display = isNightMode ? 'block' : 'none';
        }
        
        if (daySubtitle && nightSubtitle) {
            daySubtitle.style.display = isNightMode ? 'none' : 'block';
            nightSubtitle.style.display = isNightMode ? 'block' : 'none';
        }
        
        // 旧スタイルのタイトル要素があれば対応（互換性維持のため）
        const oldStyleShopName = document.querySelector('.hero h1 .shop-name:not(.day-shop-name):not(.night-shop-name)');
        const oldStyleSubtitle = document.querySelector('.hero h1 .title-line:not(.day-title):not(.night-title):not(.day-subtitle):not(.night-subtitle):not(.shop-name)');
        
        if (oldStyleShopName) {
            oldStyleShopName.textContent = isNightMode ? '「MON」' : '「門」';
        }
        
        if (oldStyleSubtitle) {
            oldStyleSubtitle.textContent = isNightMode ? 'Wine & Dine Experience' : '罪悪感ゼロの揚げ物';
        }
    }

    updateMenuSection() {
        const menuContainer = document.querySelector('#menu .container');
        if (!menuContainer) return;

        // Add night-mode-active class to body to control menu visibility via CSS
        document.body.classList.toggle('night-mode-active', this.currentMode === 'night');
        
        // Update section title
        const menuTitle = menuContainer.querySelector('.section-title');
        if (menuTitle) {
            menuTitle.textContent = this.currentMode === 'night' ? 'MON MENU' : 'メニュー';
        }
        
        // If night mode, populate the wine and food items from JSON data
        if (this.currentMode === 'night' && this.nightMenuData) {
            this.populateNightMenu();
        }
    }

    populateNightMenu() {
        // この関数は無効化されました - ワインリストはHTMLに直接記述されています
        // 食事メニューのみ動的に生成します
        const foodContainer = document.querySelector('#night-menu .food-items');
        
        if (!foodContainer || !this.nightMenuData) return;
        
        // 食事メニューのみクリア
        foodContainer.innerHTML = '';
        
        // ワインリストは更新しない（HTMLに直接記述されたものを使用）
        
        // 食事メニューのみ動的に生成
        if (this.nightMenuData.food && this.nightMenuData.food.items) {
            this.nightMenuData.food.items.forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.className = food.featured ? 'food-item featured' : 'food-item';
                foodItem.innerHTML = `
                    <h4 class="food-name">${food.name}</h4>
                    <p class="food-details">${food.description || ''}</p>
                    <p class="food-price">${food.price}</p>
                `;
                foodContainer.appendChild(foodItem);
            });
        }
    }

    // Day menu is now handled by CSS display toggling
    // No need for separate rendering functions

    updateAccessSection() {
        const operatingHours = document.querySelector('.operating-hours');
        if (operatingHours) {
            const detailedHours = `
                <div class="hours-detail">
                    <div class="hours-day">
                        <strong>平日</strong><br>
                        11:00-14:00 (門・メンチカツ)<br>
                        17:00-21:00 (MON・ワインバー)
                    </div>
                    <div class="hours-day">
                        <strong>土曜</strong><br>
                        11:00-17:00 (門・メンチカツ)<br>
                        17:00-21:00 (MON・ワインバー)
                    </div>
                    <div class="hours-day">
                        <strong>日曜</strong><br>
                        11:00-18:00 (門・メンチカツのみ)
                    </div>
                    <div class="hours-day">
                        <strong>火曜</strong><br>
                        定休日
                    </div>
                </div>
            `;
            operatingHours.innerHTML = detailedHours;
        }
    }

    updateOperatingStatus() {
        const statusElement = document.querySelector('.operating-status');
        if (!statusElement) return;

        const operatingInfo = this.getOperatingInfo();
        const statusIndicator = statusElement.querySelector('.status-indicator');
        const statusText = statusElement.querySelector('.status-text');

        if (statusIndicator) {
            statusIndicator.className = `status-indicator ${operatingInfo.status.includes('open') ? '' : operatingInfo.status}`;
        }

        if (statusText) {
            let text = '';
            switch (operatingInfo.status) {
                case 'open-day':
                    text = '営業中 (門・メンチカツ)';
                    break;
                case 'open-night':
                    text = '営業中 (MON・ワインバー)';
                    break;
                case 'changing':
                    text = 'まもなく営業開始';
                    break;
                default:
                    text = '営業時間外';
            }
            statusText.textContent = text;
        }
    }

    startStatusUpdater() {
        // Update status every minute
        setInterval(() => {
            this.updateOperatingStatus();
        }, 60000);
        
        // Initial update
        this.updateOperatingStatus();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModeSwitcher();
});
