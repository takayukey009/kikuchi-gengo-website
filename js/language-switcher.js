// 現在の言語を保存
let currentLang = localStorage.getItem('preferred-language') || 'ja';

// 言語切り替え関数
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-language', lang);
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
document.addEventListener('DOMContentLoaded', () => {
    // 言語ボタンにクリックイベントを追加
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // 初期言語を設定
    document.documentElement.lang = currentLang;
    updateContent();
    updateLanguageButtons();
});
