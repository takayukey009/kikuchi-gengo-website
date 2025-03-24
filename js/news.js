async function loadNews() {
    try {
        // ニュースリストの要素を取得
        const newsList = document.getElementById('news-list');
        if (!newsList) return;

        // 既知のニュースファイル名を直接指定
        const newsFiles = [
            '2025-03-25-01.json',  // 営業時間変更のお知らせ
            '2025-03-20-01.json',  // 4月のイベント情報
            '2025-01-30-01.json'   // 1周年記念のお知らせ
        ];
        
        // 各JSONファイルの内容を読み込む
        const newsItems = await Promise.all(
            newsFiles.map(async file => {
                try {
                    // 相対パスを使用
                    const response = await fetch(`/news/data/${file}`);
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
                return dateB - dateA;  // 新しい順
            });
        
        // ニュースリストをクリア
        newsList.innerHTML = '';
        
        // ニュースアイテムを表示
        sortedNews.forEach(newsItem => {
            const newsElement = document.createElement('a');  // aタグを使用
            newsElement.className = 'news-item';
            newsElement.style.textDecoration = 'none';  // 下線を消す
            newsElement.style.color = 'inherit';  // 親要素の文字色を継承
            newsElement.href = newsItem.content;  // 詳細ページへのリンク
            
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
        });
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// ページ読み込み時にニュースを表示
document.addEventListener('DOMContentLoaded', loadNews);

// 言語切り替え時にニュースを再表示
document.addEventListener('languageChanged', loadNews);
