# IT × ISO Vision — コーポレートサイト

アームスタンダード株式会社のコーポレートサイトです。
ISOマネジメントシステムの審査・監査・支援サービスを紹介します。

---

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Fonts（Noto Sans JP）
- Chart.js 4.4.1（CDN）— `index.html` のみ
- flatpickr（CDN）+ 日本語 locale — `contact/index.html` のみ

---

## フォルダ構成

```
project/
├── index.html                  # トップページ
│
├── assets/
│   ├── css/
│   │   ├── common.css          # 全ページ共通スタイル（header・footer・変数など）
│   │   ├── index.css           # トップページ専用スタイル
│   │   ├── contact.css         # お問い合わせページ専用スタイル（page-hero含む）
│   │   ├── privacy.css         # privacy / terms 共用スタイル（page-hero含む）
│   │   ├── company.css         # 企業情報ページ専用スタイル（page-hero含む）
│   │   └── recruit.css         # 採用情報ページ専用スタイル（page-hero含む）
│   ├── js/
│   │   ├── common.js           # 全ページ共通JS（header scroll・smooth scroll・fetch など）
│   │   ├── index.js            # トップページ専用JS（Chart.js）
│   │   └── contact.js          # お問い合わせページ専用JS
│   ├── html/
│   │   ├── header.inc          # 共通ヘッダー（fetch で各ページに挿入）
│   │   └── footer.inc          # 共通フッター（fetch で各ページに挿入）
│   └── img/                    # 画像ファイル
│
├── contact/
│   └── index.html              # お問い合わせ（種別切替フォーム）
│
├── privacy/
│   └── index.html              # プライバシーポリシー
│
├── terms/
│   └── index.html              # サイト利用規約
│
├── company/
│   └── index.html              # 企業情報（ミッション・会社情報・アクセス・沿革）
│
├── recruit/
│   └── index.html              # 採用情報（NSホールディングスへの外部リンク）
│
├── services/                   # ※未実装（予定）
│   ├── index.html
│   ├── iso-audit.html
│   └── webmics.html
│
└── pricing/                    # ※未実装（予定）
    └── index.html
```

---

## 実装済みページ一覧

| ページ | パス | CSS | JS | 備考 |
|---|---|---|---|---|
| トップ | `/index.html` | `index.css` | `index.js` | Chart.js使用 |
| お問い合わせ | `/contact/index.html` | `contact.css` | `contact.js` | flatpickr使用 |
| プライバシーポリシー | `/privacy/index.html` | `privacy.css` | — | |
| サイト利用規約 | `/terms/index.html` | `privacy.css` | — | privacy.cssを共用 |
| 企業情報 | `/company/index.html` | `company.css` | — | Googleマップ埋め込み |
| 採用情報 | `/recruit/index.html` | `recruit.css` | — | 外部リンク（NSホールディングス） |

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
| `--max-width` | `1200px` | コンテナ最大幅 |
| `--transition` | `all 0.6s cubic-bezier(0.22, 1, 0.36, 1)` | 共通トランジション |

---

## ブレークポイント

| px | 対象 |
|---|---|
| `1100px` | ナビゲーション縮小 |
| `992px` | タブレット（ハンバーガー表示） |
| `600px` | スマートフォン |

---

## 新しいページを追加する場合

1. 対応するフォルダに `index.html` を作成
2. CSS は `assets/css/ページ名.css` に作成
3. JS が必要な場合は `assets/js/ページ名.js` に作成
4. パスは**ルートからの相対パス**で記述する

```html
<link rel="stylesheet" href="../assets/css/common.css">
<link rel="stylesheet" href="../assets/css/ページ名.css">

<div id="header-placeholder"></div>
<!-- コンテンツ -->
<div id="footer-placeholder"></div>

<script src="../assets/js/common.js"></script>
<script src="../assets/js/ページ名.js"></script>  <!-- JSが必要な場合のみ -->
```

5. `<body>` には `id="top"` を付与する
6. フェードインさせたい要素には `.fade-in` クラスを付与する（common.js が自動制御）

---

## ヘッダー・ナビゲーション

- 共通ヘッダーは `assets/html/header.inc`、共通フッターは `assets/html/footer.inc` で管理
- 各ページの `<div id="header-placeholder">` / `<div id="footer-placeholder">` に `common.js` の fetch で挿入される
- **デスクトップ**：ホバーで `.open` クラスが付与されドロップダウンが表示
- **モバイル**：ハンバーガーボタンでメニューを開閉、各項目はアコーディオン形式
- ドロップダウンは `.nav-dropdown` を増やすだけで自動的にJS制御が適用される

---

## 主なCSSクラス

| クラス | 説明 |
|---|---|
| `.fade-in` | スクロール連動フェードイン（`.visible` が付与されると表示） |
| `.container` | 最大幅 `--max-width` のコンテナ |
| `.btn` | 共通ボタン |
| `.btn-outline` | 透過ボタン |
| `.btn-orange` | オレンジCTAボタン |
| `.btn-dl` | 資料ダウンロードボタン |
| `.section-header` | セクション見出し共通レイアウト（`.step-num` ラベル + `h2`） |
| `.nav-dropdown` | デスクトップドロップダウン |
| `.mobile-dropdown` | モバイルアコーディオン |
| `.page-hero` | サブページ共通ヒーロー（各ページのCSSで個別定義） |

---

## 各ページ固有の注意事項

### company/index.html
- Googleマップの `<iframe src>` は仮URLのため、正式なGoogle Maps Embed URLに差し替えること
  （Google Maps で住所検索 → 「共有」→「地図を埋め込む」で取得）

### recruit/index.html
- 採用リンク先（NSホールディングス）のURLは仮のため、正式URLに差し替えること

### privacy.css の共用
- `privacy/index.html` と `terms/index.html` の2ページで `privacy.css` を共用している
- どちらかのスタイルを変更する場合は両ページへの影響を確認すること

---

## 注意事項

- `common.css` と `common.js` は全ページで必ず読み込む
- Chart.js はトップページ（`index.js`）のみで使用
- flatpickr はお問い合わせページ（`contact/index.html`）のみで使用
- パンくずリストは現時点で未実装（階層が深くなるサービス詳細ページ実装時に導入予定）
- コンサル業務は対象外（審査業務のみ）のためコピーに注意
