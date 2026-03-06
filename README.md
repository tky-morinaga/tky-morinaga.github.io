# IT × ISO Vision — コーポレートサイト

NSホールディングスグループのコーポレートサイトです。
ISOマネジメントシステムの審査・支援サービスを紹介します。

---

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Fonts（Noto Sans JP）
- Chart.js 4.4.1（CDN）— index.html のみ
- flatpickr（CDN）+ 日本語 locale — contact/index.html のみ

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
│   │   ├── contact.css         # お問い合わせページ専用スタイル
│   │   └── privacy.css         # プライバシーポリシー・サイト利用規約 共用スタイル
│   ├── js/
│   │   ├── common.js           # 全ページ共通スクリプト
│   │   ├── index.js            # トップページ専用スクリプト（Chart.js）
│   │   └── contact.js          # お問い合わせページ専用スクリプト
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
├── services/                   # ※未実装（予定）
│   ├── index.html              # サービス一覧
│   ├── iso-audit.html          # ISO認証審査
│   └── webmics.html            # WebMiCSコース
│
├── company/                    # ※未実装（予定）
│   └── index.html              # 企業情報
│
└── pricing/                    # ※未実装（予定）
    └── index.html              # 料金
```

---

## 共通パーツの仕組み（header.inc / footer.inc）

ヘッダーとフッターは `assets/html/` に `.inc` ファイルとして分離されており、
`common.js` が DOMContentLoaded 時に `fetch` で各ページの placeholder に挿入する。

```html
<!-- 各ページの HTML 内（body 直下）-->
<div id="header-placeholder"></div>

<!-- ページ本文 -->

<div id="footer-placeholder"></div>
```

ヘッダー・フッターを編集する場合は `.inc` ファイルのみ修正すればよい。
個別ページの HTML は変更不要。

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

## CSS ファイルの使い分け

| ファイル | 対象ページ | 主な内容 |
|---|---|---|
| `common.css` | 全ページ | 変数・reset・ボタン・header・footer・fade-in・ドロップダウン |
| `index.css` | index.html | Hero・Empathy・About・Vision・Situation・Proposal・Impact・Essence |
| `contact.css` | contact/index.html | page-hero・種別カード・フォーム・サイドバー・FAQ |
| `privacy.css` | privacy/ & terms/ | page-hero・本文ブロック・リスト・お問い合わせ枠 |

> ⚠️ `privacy.css` は privacy と terms の **2ページで共用**。page-hero の定義も内包している。
> `contact.css` も同様に page-hero を内包している。

---

## 外部ライブラリ

| ライブラリ | 用途 | 読み込みページ |
|---|---|---|
| Chart.js 4.4.1（CDN） | ドーナツチャート | index.html のみ |
| flatpickr（CDN） | 日時ピッカー | contact/index.html のみ |
| flatpickr/l10n/ja.js | flatpickr 日本語化 | contact/index.html のみ |

---

## 新しいページを追加する場合

1. 対応するフォルダ（例：`company/`）に `index.html` を作成
2. CSS は `assets/css/ページ名.css` に作成
3. JS が必要な場合のみ `assets/js/ページ名.js` に作成
4. パスはルートからの相対パスで記述する（サブフォルダからは `../` で一段上がる）

```html
<!-- head 内 -->
<link rel="stylesheet" href="../assets/css/common.css">
<link rel="stylesheet" href="../assets/css/ページ名.css">

<!-- body 直下 -->
<div id="header-placeholder"></div>

<!-- ページ本文 -->

<div id="footer-placeholder"></div>

<!-- body 末尾 -->
<script src="../assets/js/common.js"></script>
<script src="../assets/js/ページ名.js"></script><!-- JS 不要なら省略可 -->
```

---

## ヘッダー・ナビゲーション

- **デスクトップ**：ホバーで `.open` クラスが付与されドロップダウンが表示される
- **モバイル**：ハンバーガーボタンでメニューを開閉、各項目はアコーディオン形式
- ドロップダウンは `.nav-dropdown` を増やすだけで自動的に JS 制御が適用される

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
| `.page-hero` | サブページ共通ヒーロー（contact.css / privacy.css に定義） |
| `.privacy-body` | プライバシー・規約ページの本文エリア |
| `.type-card` | お問い合わせ種別カード |

---

## 注意事項

- `common.css` と `common.js` は全ページで必ず読み込む
- コンサル業務は対象外（審査業務のみ）のためコピーに注意
- Chart.js はトップページ（`index.js`）のみで使用
- flatpickr はお問い合わせページ（`contact.js`）のみで使用
- `privacy.css` を新規ページで流用する場合、page-hero スタイルもセットで付いてくる点に注意
