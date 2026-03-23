/* ============================================================
   download.js — 資料ダウンロードページ専用スクリプト
   ※ common.js を読み込んだ後に読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- カテゴリフィルター ---
    const filterBtns = document.querySelectorAll('.dl-filter-btn');
    const cards = document.querySelectorAll('.dl-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- ダウンロードボタン → フォームへスクロール & 資料名をセット ---
    const docNames = {
        'iso-overview':   'ISO認証審査サービス概要',
        'iso-schedule':   'ISO取得スケジュール早見表',
        'audit-overview': '監査サービス紹介資料',
        'webmics-overview': 'WebMiCS サービス紹介資料',
        'iso-beginners':  'ISO取得 はじめてガイド',
        'iso-checklist':  'ISO 形骸化チェックリスト',
    };

    const dlFormTitle = document.getElementById('dlFormTitle');
    const dlFormDesc  = document.getElementById('dlFormDesc');
    const dlDocTarget = document.getElementById('dlDocTarget');

    document.querySelectorAll('.btn-dl-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const doc = btn.getAttribute('data-doc');
            const docName = docNames[doc] || '資料';

            dlDocTarget.value = doc;
            dlFormTitle.textContent = `「${docName}」のダウンロード`;
            dlFormDesc.textContent  = `以下のフォームにご入力いただくと、「${docName}」のダウンロードリンクをメールでお送りします。`;

            const formSection = document.getElementById('dl-form');
            const offset = 100;
            const top = formSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // --- フォームバリデーション & 送信（仮） ---
    const form = document.getElementById('downloadForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const errors = [];

        const check = (id, label) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.value.trim() === '') {
                errors.push(`・${label}は必須です。`);
                el.classList.add('input-error');
            } else {
                el.classList.remove('input-error');
            }
        };

        check('dlCompany', '会社名');
        check('dlName',    '氏名');
        check('dlEmail',   'メールアドレス');

        const privacy = document.getElementById('dlPrivacy');
        if (privacy && !privacy.checked) {
            errors.push('・プライバシーポリシーへの同意は必須です。');
            privacy.classList.add('input-error');
        } else if (privacy) {
            privacy.classList.remove('input-error');
        }

        let errorBox = form.querySelector('.form-error-box');
        if (errors.length > 0) {
            if (!errorBox) {
                errorBox = document.createElement('div');
                errorBox.className = 'form-error-box';
                form.prepend(errorBox);
            }
            errorBox.innerHTML = errors.join('<br>');
            errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (errorBox) errorBox.remove();

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中…';

        setTimeout(() => {
            const wrapper = document.querySelector('.dl-form-inner');
            wrapper.innerHTML = `
                <div class="submit-complete">
                    <div class="submit-complete-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                    </div>
                    <h2>送信が完了しました</h2>
                    <p>ご入力いただいたメールアドレスに<br>ダウンロードリンクをお送りしました。</p>
                    <p>届かない場合は迷惑メールフォルダをご確認ください。</p>
                </div>
            `;
        }, 1200);
    });

    form.addEventListener('input', (e) => {
        e.target.classList.remove('input-error');
        const errorBox = form.querySelector('.form-error-box');
        if (errorBox) errorBox.remove();
    });

});