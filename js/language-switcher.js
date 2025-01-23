// 現在の言語を保存
let currentLang = localStorage.getItem('language') || 'ja';

// 言語切り替え関数
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang; // HTML langを更新
    updateContent();
    updateLanguageButtons();
}

// 言語ボタンのアクティブ状態を更新
function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// テキストコンテンツを更新
function updateContent() {
    // data-translate属性を持つ全要素を更新
    document.querySelectorAll('[data-translate]').forEach(element => {
        const translationKey = element.dataset.translate;
        const keys = translationKey.split('.');
        let translation = translations[currentLang];
        
        // ネストされたオブジェクトから翻訳を取得
        for (const key of keys) {
            if (translation && translation[key]) {
                translation = translation[key];
            } else {
                console.warn(`Translation missing for key: ${translationKey} in language: ${currentLang}`);
                return;
            }
        }
        
        element.textContent = translation;
    });
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const defaultLanguage = 'ja';
    
    // Set initial language
    setLanguage(localStorage.getItem('language') || defaultLanguage);

    // Language button click handlers
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            setLanguage(language);
        });
    });

    function setLanguage(language) {
        // Update active button state
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === language) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Save language preference
        localStorage.setItem('language', language);

        // Set document language for proper font rendering
        document.documentElement.lang = language;

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translations[language][key]);
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
    }
});
