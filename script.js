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

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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
