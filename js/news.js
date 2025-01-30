async function loadNews() {
    try {
        // ニュース一覧を取得
        const newsListResponse = await fetch('/news/content/');
        const newsFiles = await newsListResponse.json();
        
        // JSONファイルのみを抽出
        const jsonFiles = newsFiles.filter(file => file.endsWith('.json'));
        
        // 各JSONファイルの内容を読み込む
        const newsItems = await Promise.all(
            jsonFiles.map(async file => {
                try {
                    const response = await fetch(`/news/content/${file}`);
                    if (!response.ok) {
                        console.error(`Failed to load ${file}:`, response.status);
                        return null;
                    }
                    const item = await response.json();
                    return item;
                } catch (error) {
                    console.error(`Error loading ${file}:`, error);
                    return null;
                }
            })
        );

        // nullを除外し、日付でソート
        const sortedNews = newsItems
            .filter(item => item)
            .sort((a, b) => {
                const dateA = new Date(a.date.replace(/\./g, '-'));
                const dateB = new Date(b.date.replace(/\./g, '-'));
                return dateB - dateA;
            });

        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = ''; // Clear existing items
        
        // ニュースアイテムを表示
        sortedNews.forEach(newsItem => {
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
