document.addEventListener('DOMContentLoaded', function() {
    // すべてのアンカーリンクを取得
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // リンクのhref属性から対象のIDを取得
            const targetId = this.getAttribute('href');
            
            // 対象の要素を取得
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ナビゲーションバーの高さを取得
                const navHeight = document.querySelector('nav').offsetHeight;
                
                // 要素の位置を取得し、ナビゲーションバーの高さを考慮
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // スムーズスクロール
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
