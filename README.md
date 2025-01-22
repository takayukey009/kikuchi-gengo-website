# 菊池源吾牛「門」ウェブサイト

## プロジェクトについて
循環型畜産農で完全無添加にこだわり、人にも環境にも優しい黒毛和牛を生産している菊池ユートピアファームのオメガリッチ国産牛「菊池源吾牛」を使用したメニューを提供する「門」のウェブサイトです。

## 主な機能
- レスポンシブデザイン
- メニュー表示
- 店舗情報
- 予約リンク

## ファイル構成
```
kikuchi-gengo-website/
│
├── index.html          # メインのHTMLファイル
├── style.css          # スタイルシート
├── script.js          # JavaScriptファイル
│
└── images/            # 画像ファイル
    ├── hero-bg.jpg    # ヒーロー背景画像
    ├── about-img.jpg  # アバウト画像
    ├── menu-1.jpg     # メニュー画像1
    └── menu-2.jpg     # メニュー画像2
```

## 使用方法

### 1. プロジェクトのクローン
```bash
git clone https://github.com/takayukey009/kikuchi-gengo-website.git
cd kikuchi-gengo-website
```

### 2. 開発サーバーの起動
```bash
# Pythonの場合
python -m http.server 8000

# Node.jsの場合
npx http-server
```

### 3. ブラウザでアクセス
- `http://localhost:8000` にアクセスしてウェブサイトを表示

## 変更の反映方法

### 1. 変更の確認
```bash
git status  # 変更されたファイルを確認
```

### 2. 変更の追加
```bash
git add .  # すべての変更を追加
```

### 3. 変更のコミット
```bash
git commit -m "変更の説明"  # 変更を記録
```

### 4. GitHubへのプッシュ
```bash
git push  # 変更をGitHubに反映
```

## GitHub Pagesでの公開方法
1. GitHubのリポジトリページにアクセス
2. 「Settings」タブを選択
3. 左メニューから「Pages」を選択
4. 「Source」で「Deploy from a branch」を選択
5. 「Branch」で「main」を選択し、保存
6. 数分後に `https://takayukey009.github.io/kikuchi-gengo-website/` でサイトが公開されます

## 開発環境
- HTML5
- CSS3
- JavaScript
- Git/GitHub

## ライセンス
All rights reserved.
