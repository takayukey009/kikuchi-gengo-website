// 現在の言語を保存
let currentLang = localStorage.getItem('language') || 'ja';

// ネストされたオブジェクトから値を取得する関数
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined;
    }, obj);
}

// 言語切り替え関数
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // 全ての翻訳可能な要素を更新
    document.querySelectorAll('[data-translate]').forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLang], translationKey);
        
        if (translation !== undefined) {
            if (element.tagName === 'META') {
                element.setAttribute('content', translation);
            } else {
                element.textContent = translation;
            }
        } else {
            console.warn(`Translation missing for key: ${translationKey} in language: ${currentLang}`);
        }
    });

    // 言語ボタンの状態を更新
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// DOMContentLoadedイベントリスナー
document.addEventListener('DOMContentLoaded', function() {
    // 初期言語を設定
    switchLanguage(currentLang);

    // 言語ボタンのクリックハンドラーを設定
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            switchLanguage(language);
        });
    });
});
