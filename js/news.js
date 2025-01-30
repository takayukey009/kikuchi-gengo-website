async function loadNews() {
    try {
        // news/contentディレクトリ内のJSONファイルを直接指定して読み込む
        const response = await fetch('/news/content/2025-01-30-01.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newsItem = await response.json();
        
        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = ''; // Clear existing items
        
        // ニュースアイテムを表示
        const newsElement = document.createElement('a');
        newsElement.href = '#';
        newsElement.className = 'news-item';
        
        if (newsItem.important) {
            newsElement.classList.add('important');
        }
        
        const date = document.createElement('div');
        date.className = 'news-date';
        date.textContent = newsItem.date;
        
        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = document.documentElement.lang === 'en' ? newsItem.title_en :
                          document.documentElement.lang === 'zh' ? newsItem.title_zh :
                          newsItem.title;
        
        newsElement.appendChild(date);
        newsElement.appendChild(title);
        newsList.appendChild(newsElement);
    } catch (error) {
        console.error('Failed to load news:', error);
    }
}

// ページ読み込み時にニュースを表示
document.addEventListener('DOMContentLoaded', loadNews);

// 言語切り替え時にニュースを再表示
document.addEventListener('languageChanged', () => {
    loadNews();
});
