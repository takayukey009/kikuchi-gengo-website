// Navigation scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');
    
    // Intersection Observer for hero section
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            nav.style.backgroundColor = entry.isIntersecting ? 
                'transparent' : 'rgba(26, 26, 26, 0.95)';
        });
    }, { threshold: 0.1 });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // ナビゲーションバーの高さ分を考慮
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールインジケーターのクリックイベント
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        // ページの最下部までスクロール
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        // スクロールアニメーションの時間を長めに設定
        const scrollDuration = 2000; // 2秒
        const startPosition = window.pageYOffset;
        const distance = documentHeight - startPosition;
        const startTime = performance.now();

        function scrollAnimation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / scrollDuration, 1);
            
            // イージング関数を使用してよりスムーズなアニメーションに
            const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            const run = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * run));

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    });

    // Real-time form validation
    const form = document.querySelector('.reservation-form');
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                input.classList.add('error');
            });
            
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            try {
                // Here you would normally send the form data to your server
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
                
                // Show success message
                alert('ご予約を受け付けました。確認メールをお送りいたしますので、ご確認ください。');
                form.reset();
            } catch (error) {
                alert('エラーが発生しました。もう一度お試しください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '予約する';
            }
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Image loading debug
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.error('Image failed to load:', this.src);
                this.style.border = '2px solid red';
            });
            
            img.addEventListener('load', function() {
                console.log('Image loaded successfully:', this.src);
            });
        });

        // Debug background image
        const hero = document.querySelector('.hero');
        if (hero) {
            const backgroundImage = getComputedStyle(hero).backgroundImage;
            console.log('Hero background image:', backgroundImage);
        }
    });

    // Update temperature
    const updateTemperature = () => {
        const temp = document.querySelector('.temperature');
        if (temp) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            temp.textContent = `${hours}:${minutes} / 23℃`;
        }
    };
    
    updateTemperature();
    setInterval(updateTemperature, 60000);

    // メイン処理
    initializeLanguageSwitch();
    initializeScrollBehavior();
    initializeAnimations();

    // 言語切り替え機能の初期化
    function initializeLanguageSwitch() {
        const languageSwitches = document.querySelectorAll('.language-switch a');
        
        languageSwitches.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const isJapanese = this.textContent.trim() === 'JP';
                
                // アクティブクラスの切り替え
                languageSwitches.forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                // 全てのデータ属性を持つ要素を更新
                document.querySelectorAll('[data-ja][data-en]').forEach(element => {
                    console.log('Updating element:', element);
                    console.log('Current text:', element.textContent);
                    console.log('JP text:', element.getAttribute('data-ja'));
                    console.log('EN text:', element.getAttribute('data-en'));
                    
                    const newText = isJapanese ? element.getAttribute('data-ja') : element.getAttribute('data-en');
                    element.textContent = newText;
                });

                // タイトルの更新
                document.title = isJapanese ? '菊池源吾牛メンチカツ' : 'Artisanal Wagyu Croquette';

                // フォントの更新
                const titleLines = document.querySelectorAll('.title-line');
                titleLines.forEach(line => {
                    if (isJapanese) {
                        line.style.fontFamily = "'Noto Serif JP', serif";
                        line.style.letterSpacing = '0.1em';
                    } else {
                        line.style.fontFamily = "'Cormorant Garamond', serif";
                        line.style.letterSpacing = 'normal';
                    }
                });
            });
        });
    }

    // スクロール関連の機能初期化
    function initializeScrollBehavior() {
        // スムーズスクロール
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // スクロールインジケーター
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const documentHeight = Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                );
                
                const scrollDuration = 2000;
                const startPosition = window.pageYOffset;
                const distance = documentHeight - startPosition;
                const startTime = performance.now();

                function scrollAnimation(currentTime) {
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / scrollDuration, 1);
                    
                    const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    const run = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * run));

                    if (progress < 1) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }

                requestAnimationFrame(scrollAnimation);
            });
        }
    }

    // アニメーション機能の初期化
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('fade-out');
            observer.observe(section);
        });
    }

    // Language switcher
    const languageSwitch = document.querySelector('.language-switch');
    if (languageSwitch) {
        const switchLanguage = (lang) => {
            // Update active state of language links
            const links = languageSwitch.querySelectorAll('a');
            links.forEach(link => {
                link.classList.remove('active');
                if (link.textContent === lang) {
                    link.classList.add('active');
                }
            });

            // Update all translatable elements
            document.querySelectorAll('[data-ja][data-en]').forEach(element => {
                const newText = element.dataset[lang.toLowerCase()];
                if (newText) {
                    // ナビゲーションリンクの場合は非表示にしない
                    if (element.classList.contains('nav-links') || element.closest('.nav-links')) {
                        element.textContent = newText;
                    } else {
                        element.style.opacity = '0';
                        setTimeout(() => {
                            element.textContent = newText;
                            element.style.opacity = '1';
                        }, 300);
                    }
                }
            });

            // Update HTML lang attribute
            document.documentElement.lang = lang.toLowerCase() === 'jp' ? 'ja' : 'en';

            // Update form placeholders
            if (lang.toLowerCase() === 'en') {
                document.querySelector('#name').placeholder = 'Enter your name';
                document.querySelector('#email').placeholder = 'Enter your email';
            } else {
                document.querySelector('#name').placeholder = 'お名前';
                document.querySelector('#email').placeholder = 'メールアドレス';
            }

            // Store language preference
            localStorage.setItem('preferred-language', lang);
        };

        languageSwitch.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const lang = e.target.textContent;
                switchLanguage(lang);
            }
        });

        // Load preferred language on page load
        const preferredLanguage = localStorage.getItem('preferred-language');
        if (preferredLanguage) {
            switchLanguage(preferredLanguage);
        }
    }

    // スクロールプログレスバーの追加
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.className = 'scroll-progress-bar';
    scrollProgress.appendChild(scrollProgressBar);
    nav.appendChild(scrollProgress);

    // 初期状態の設定
    nav.classList.add('transparent');

    // スクロール処理
    function handleScroll() {
        // スクロール位置の取得
        const scrollPosition = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        // ナビゲーションの透明度制御
        if (scrollPosition > heroHeight * 0.1) {
            nav.classList.remove('transparent');
            nav.classList.add('scrolled');
        } else {
            nav.classList.add('transparent');
            nav.classList.remove('scrolled');
        }
        
        // スクロールプログレスバーの更新
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollPosition / windowHeight) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;
    }

    // スクロールイベントの登録
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期状態の設定
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero image
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'hero-bg.jpg';
    document.head.appendChild(preloadLink);
});
