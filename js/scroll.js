document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
        handleScroll();
    });

    handleScroll(); // Initial check

    // スクロールインジケーターのクリックイベント
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            window.scrollTo({
                top: documentHeight,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"], .scroll-indicator').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;  // #だけの場合は何もしない
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
