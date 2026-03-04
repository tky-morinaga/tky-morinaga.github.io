# IT × ISO Vision — コーポレートサイト

NSホールディングスグループのコーポレートサイトです。
ISOマネジメントシステムの審査・支援サービスを紹介します。

---

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Fonts（Noto Sans JP）
- Chart.js 4.4.1（CDN）

---

## フォルダ構成
```
project/
├── index.html              # トップページ
├── assets/
│   ├── css/
│   │   ├── common.css      # 全ページ共通スタイル
│   │   └── index.css       # トップページ専用スタイル
│   ├── js/
│   │   ├── common.js       # 全ページ共通スクリプト
│   │   └── index.js        # トップページ専用スクリプト
│   └── img/                # 画像ファイル
├── services/
│   ├── index.html          # サービス一覧
│   ├── iso-audit.html      # ISO認証審査
│   └── webmics.html        # WebMiCSコース
├── company/
│   └── index.html          # 企業情報
├── pricing/
│   └── index.html          # 料金
└── contact/
    └── index.html          # お問い合わせ
```

---

## CSSカラー変数（common.css）

| 変数名 | 値 | 用途 |
|---|---|---|
| `--primary` | `#0B1F3A` | メインカラー（紺） |
| `--accent` | `#2F80ED` | アクセント（青） |
| `--accent-light` | `#E6F0FF` | アクセント薄（背景など） |
| `--orange` | `#F26419` | CTAボタン |
| `--bg` | `#F5F7FA` | ページ背景 |
| `--white` | `#FFFFFF` | 白 |
| `--text` | `#1A1A1A` | 本文 |
| `--text-light` | `#666666` | サブテキスト |

---

## ブレークポイント

| px | 対象 |
|---|---|
| 1100px | ナビゲーション縮小 |
| 992px | タブレット（ハンバーガー表示） |
| 600px | スマートフォン |

---

## 新しいページを追加する場合

1. 対応するフォルダに `index.html` を作成
2. CSS は `assets/css/ページ名.css` に作成
3. JS は `assets/js/ページ名.js` に作成
4. パスはルートからの相対パスで記述する
```html
<link rel="stylesheet" href="../assets/css/common.css">
<link rel="stylesheet" href="../assets/css/ページ名.css">
<script src="../assets/js/common.js"></script>
<script src="../assets/js/ページ名.js"></script>
```

---

## ヘッダー・ナビゲーション

- **デスクトップ**：ホバーで `.open` クラスが付与されドロップダウンが表示される
- **モバイル**：ハンバーガーボタンでメニューを開閉、各項目はアコーディオン形式
- ドロップダウンは `.nav-dropdown` を増やすだけで自動的にJS制御が適用される

---

## 主なCSSクラス

| クラス | 説明 |
|---|---|
| `.fade-in` | スクロール連動フェードイン（`.visible` が付与されると表示） |
| `.btn` | 共通ボタン |
| `.btn-outline` | 透過ボタン |
| `.btn-orange` | オレンジCTAボタン |
| `.btn-dl` | 資料ダウンロードボタン |
| `.section-header` | セクション見出し共通レイアウト |
| `.nav-dropdown` | デスクトップドロップダウン |
| `.mobile-dropdown` | モバイルアコーディオン |

---

## 注意事項

- `common.css` と `common.js` は全ページで必ず読み込む
- コンサル業務は対象外（審査業務のみ）のためコピーに注意
- Chart.js はトップページ（`index.js`）のみで使用
