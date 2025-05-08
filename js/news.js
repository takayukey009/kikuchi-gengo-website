async function loadNews() {
    try {
        // ニュースリストの要素を取得
        const newsList = document.getElementById('news-list');
        if (!newsList) return;

        // data.jsonファイルから動的にニュースデータを取得
        const response = await fetch('/news/data.json');
        if (!response.ok) {
            console.error('Failed to load news data:', response.status);
            return;
        }
        const data = await response.json();
        
        // ニュースアイテムを取得
        const newsItems = data.news || [];
        
        // ニュースリストをクリア
        newsList.innerHTML = '';
        
        // ニュースアイテムを表示（3件まで）
        const displayCount = Math.min(newsItems.length, 3);
        
        for (let i = 0; i < displayCount; i++) {
            const newsItem = newsItems[i];
            const newsElement = document.createElement('a');  // aタグを使用
            newsElement.className = 'news-item';
            newsElement.style.textDecoration = 'none';  // 下線を消す
            newsElement.style.color = 'inherit';  // 親要素の文字色を継承
            newsElement.href = `/news/${newsItem.content}`;  // 詳細ページへのリンク
            
            if (newsItem.important) {
                newsElement.classList.add('important');
            }
            
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = newsItem.date;
            
            const title = document.createElement('div');
            title.className = 'news-title';
            // 言語に応じてタイトルを選択
            const currentLang = document.documentElement.lang;
            title.textContent = currentLang === 'en' ? newsItem.title_en :
                              currentLang === 'zh' ? newsItem.title_zh :
                              newsItem.title;
            
            newsElement.appendChild(date);
            newsElement.appendChild(title);
            newsList.appendChild(newsElement);
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// ページ読み込み時にニュースを表示
document.addEventListener('DOMContentLoaded', loadNews);

// 言語切り替え時にニュースを再表示
document.addEventListener('languageChanged', loadNews);
