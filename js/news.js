async function loadNews() {
    try {
        const response = await fetch('/news/data.json');
        const data = await response.json();
        const newsList = document.querySelector('.news-list');
        
        // 最新の3件のみ表示
        const recentNews = data.news.slice(0, 3);
        
        recentNews.forEach(news => {
            const newsItem = document.createElement('a');
            newsItem.href = `/news/content/${news.content}`;
            newsItem.className = 'news-item';
            
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = news.date;
            
            const title = document.createElement('div');
            title.className = 'news-title';
            title.textContent = document.documentElement.lang === 'en' ? news.title_en :
                              document.documentElement.lang === 'zh' ? news.title_zh :
                              news.title;
            
            newsItem.appendChild(date);
            newsItem.appendChild(title);
            newsList.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Failed to load news:', error);
    }
}

// ページ読み込み時にニュースを表示
document.addEventListener('DOMContentLoaded', loadNews);

// 言語切り替え時にニュースを再表示
document.addEventListener('languageChanged', () => {
    const newsList = document.querySelector('.news-list');
    newsList.innerHTML = '';
    loadNews();
});
