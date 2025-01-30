async function loadNews() {
    try {
        // news/contentディレクトリ内の全てのJSONファイルを取得
        const newsFiles = await fetch('/news/content/');
        const newsItems = await Promise.all(
            (await newsFiles.json()).map(async file => {
                if (file.endsWith('.json')) {
                    const response = await fetch(`/news/content/${file}`);
                    return await response.json();
                }
            })
        );

        // 日付でソート
        const sortedNews = newsItems
            .filter(item => item) // nullを除外
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = ''; // Clear existing items
        
        // 最新の3件のみ表示
        const recentNews = sortedNews.slice(0, 3);
        
        recentNews.forEach(news => {
            const newsItem = document.createElement('a');
            newsItem.href = '#'; // リンク先は必要に応じて設定
            newsItem.className = 'news-item';
            
            if (news.important) {
                newsItem.classList.add('important');
            }
            
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
    loadNews();
});
