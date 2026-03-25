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
├── index.html                      # トップページ
│
├── assets/
│   ├── css/
│   │   ├── common.css              # 全ページ共通スタイル（header・footer・変数など）
│   │   ├── index.css               # トップページ専用スタイル
│   │   ├── contact.css             # お問い合わせページ専用スタイル（page-hero含む）
│   │   ├── privacy.css             # privacy / terms / invoice 共用スタイル（page-hero含む）
│   │   ├── company.css             # 企業情報ページ専用スタイル（page-hero含む）
│   │   ├── recruit.css             # 採用情報ページ専用スタイル（page-hero含む）
│   │   ├── download.css            # 資料ダウンロードページ専用スタイル（page-hero含む）
│   │   ├── policy.css              # 品質基本方針・各種規程ページ共用スタイル（page-hero含む）
│   │   └── ethics.css              # 倫理規程・機密保持規程・反社方針ページ専用スタイル
│   ├── js/
│   │   ├── common.js               # 全ページ共通JS（header scroll・smooth scroll・fetch など）
│   │   ├── index.js                # トップページ専用JS（Chart.js・フェーズ選択・ジャーニーナビ）
│   │   ├── contact.js              # お問い合わせページ専用JS（種別切替・flatpickr・バリデーション）
│   │   └── download.js             # 資料ダウンロードページ専用JS（フィルター・バリデーション）
│   ├── html/
│   │   ├── header.inc              # 共通ヘッダー（fetch で各ページに挿入）
│   │   └── footer.inc              # 共通フッター（fetch で各ページに挿入）
│   └── img/                        # 画像ファイル
│
├── contact/
│   └── index.html                  # お問い合わせ（種別切替フォーム）
│
├── privacy/
│   └── index.html                  # プライバシーポリシー
│
├── terms/
│   └── index.html                  # サイト利用規約
│
├── company/
│   └── index.html                  # 企業情報（ミッション・会社情報・アクセス・沿革）
│
├── recruit/
│   └── index.html                  # 採用情報（NSホールディングスへの外部リンク）
│
├── invoice/
│   └── index.html                  # インボイス制度 適格請求書発行事業者情報
│
├── download/
│   └── index.html                  # 資料ダウンロード（カテゴリフィルター・フォーム）
│
├── policy/
│   ├── index.html                  # 品質基本方針
│   ├── arms/
│   │   └── index.html              # アームスタンダード方針
│   ├── ethics/
│   │   └── index.html              # 倫理規程
│   ├── confidentiality/
│   │   └── index.html              # 機密保持規程
│   ├── security/
│   │   └── index.html              # 情報セキュリティ方針
│   └── antisocial/
│       └── index.html              # 反社会的勢力に対する基本方針
│
├── services/                       # ※未実装（予定）
│   ├── index.html
│   ├── iso-audit.html
│   └── webmics.html
│
└── pricing/                        # ※未実装（予定）
    └── index.html
```

---

## 実装済みページ一覧

| ページ | パス | CSS | JS | 備考 |
|---|---|---|---|---|
| トップ | `/index.html` | `index.css` | `index.js` | Chart.js・フェーズ選択パネル・ジャーニーナビ |
| お問い合わせ | `/contact/index.html` | `contact.css` | `contact.js` | flatpickr・3種別フォーム切替・バリデーション |
| プライバシーポリシー | `/privacy/index.html` | `privacy.css` | — | |
| サイト利用規約 | `/terms/index.html` | `privacy.css` | — | privacy.cssを共用 |
| 企業情報 | `/company/index.html` | `company.css` | — | Googleマップ埋め込み |
| 採用情報 | `/recruit/index.html` | `recruit.css` | — | 外部リンク（NSホールディングス） |
| インボイス制度 | `/invoice/index.html` | `privacy.css` | — | privacy.cssを共用 |
| 資料ダウンロード | `/download/index.html` | `download.css` | `download.js` | カテゴリフィルター・メール送信フォーム |
| 品質基本方針 | `/policy/index.html` | `policy.css` | — | |
| アームスタンダード方針 | `/policy/arms/index.html` | `policy.css` | — | |
| 倫理規程 | `/policy/ethics/index.html` | `policy.css` + `ethics.css` | — | 改訂履歴テーブル |
| 機密保持規程 | `/policy/confidentiality/index.html` | `policy.css` + `ethics.css` | — | 誓約書テーブル |
| 情報セキュリティ方針 | `/policy/security/index.html` | `policy.css` | — | |
| 反社会的勢力に対する基本方針 | `/policy/antisocial/index.html` | `policy.css` + `ethics.css` | — | |

---

## 未実装ページ一覧

| ページ | パス | 備考 |
|---|---|---|
| サービス一覧 | `/services/index.html` | ヘッダーナビ・フッターからリンク済み |
| ISO認証審査 | `/services/iso-audit.html` | トップページのサービスカードからリンク済み |
| WebMiCS | `/services/webmics.html` | トップページのサービスカードからリンク済み |
| 料金 | `/pricing/index.html` | ヘッダーナビ・フッターからリンク済み |
| お知らせ | （未定） | ヘッダーナビ・フッターからリンク済み |

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
7. ページヒーローは各ページのCSSに `.page-hero` として個別定義する（共通CSSには含まない）

---

## CSS共用ルール

| CSS | 使用ページ |
|---|---|
| `privacy.css` | `privacy/`・`terms/`・`invoice/` の3ページ |
| `policy.css` | `policy/` 配下の全ページ |
| `ethics.css` | `policy/ethics/`・`policy/confidentiality/`・`policy/antisocial/` の3ページ（`policy.css` と併用） |

どちらかのスタイルを変更する場合は、共用している全ページへの影響を確認すること。

---

## ヘッダー・ナビゲーション

- 共通ヘッダーは `assets/html/header.inc`、共通フッターは `assets/html/footer.inc` で管理
- 各ページの `<div id="header-placeholder">` / `<div id="footer-placeholder">` に `common.js` の fetch で挿入される
- **デスクトップ**：ホバーで `.open` クラスが付与されドロップダウンが表示。サブメニュー（フライアウト）にも対応
- **モバイル**：ハンバーガーボタンでメニューを開閉。各項目はアコーディオン形式、サブ項目はさらにネスト展開
- ドロップダウンは `.nav-dropdown` を増やすだけで自動的にJS制御が適用される

---

## 主なCSSクラス

| クラス | 説明 |
|---|---|
| `.fade-in` | スクロール連動フェードイン（`.visible` が付与されると表示） |
| `.container` | 最大幅 `--max-width` のコンテナ |
| `.btn` | 共通ボタン（青） |
| `.btn-outline` | 透過ボタン（白枠） |
| `.btn-orange` | オレンジCTAボタン |
| `.btn-dl` | 資料ダウンロードボタン（水色グラデーション） |
| `.section-header` | セクション見出し共通レイアウト（`.step-num` ラベル + `h2`） |
| `.nav-dropdown` | デスクトップドロップダウン |
| `.mobile-dropdown` | モバイルアコーディオン |
| `.page-hero` | サブページ共通ヒーロー（各ページのCSSで個別定義） |
| `.privacy-h2` | privacy.css / policy.css 系の左ボーダー付き見出し |
| `.policy-ol` | カウンター番号付きリスト（policy.css） |
| `.ethics-revision-table` | 改訂履歴テーブル（ethics.css） |

---

## 各ページ固有の注意事項

### index.html（トップページ）
- `index.js` にフェーズ選択パネル・ジャーニーナビのスクロール連動アクティブ・Chart.jsドーナツチャートを実装
- Chart.js は CDN から読み込み（`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`）

### contact/index.html
- `contact.js` に種別切替（一般・見積もり・無料相談）・flatpickr 日時選択・バリデーション・送信完了表示を実装
- flatpickr は CDN から読み込み（日本語 locale も別途読み込み必須）

### company/index.html
- Googleマップの `<iframe src>` は正式な Google Maps Embed URL を設定済み
  （Google Maps で住所検索 → 「共有」→「地図を埋め込む」で再取得可）

### download/index.html
- `download.js` にカテゴリフィルター・ダウンロードボタンクリック時のフォームスクロール・フォームバリデーションを実装
- 実際のダウンロードリンク送信処理はモック（`setTimeout` による完了表示）のため、バックエンド連携時に差し替えること

### policy/ 配下
- `policy.css` は `policy/` 配下の全ページで共用
- `ethics.css` は `policy/ethics/`・`policy/confidentiality/`・`policy/antisocial/` の3ページで追加読み込み
- ページパスが2階層深いため、CSS・JS のパスは `../../assets/css/` のように調整すること

---

## 注意事項

- `common.css` と `common.js` は全ページで必ず読み込む
- Chart.js はトップページ（`index.js`）のみで使用
- flatpickr はお問い合わせページ（`contact/index.html`）のみで使用
- フォームの送信処理はすべてモック実装（`setTimeout` による完了表示）。本番運用前にバックエンド連携が必要
