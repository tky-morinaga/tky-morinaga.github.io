/* ============================================================
   contact.js — お問い合わせページ専用スクリプト
   ※ common.js を読み込んだ後に読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- お問い合わせ種別の切り替え ---
    const typeCards = document.querySelectorAll('.type-card');
    const formTitle = document.getElementById('formTitle');
    const formDesc = document.getElementById('formDesc');

    const typeConfig = {
        general: {
            title: '一般お問い合わせ',
            desc: '下記に当てはまる方は、フォームよりお問い合わせください。<br><br>1.当社サービスに関するお問い合わせ<br>2.ISO認証審査、監査サービスに関するご相談<br>3.その他のお問い合わせ',
        },
        estimate: {
            title: 'サービス料金お見積もり',
            desc: '下記に当てはまる方は、フォームよりお問い合わせください。<br><br>1.オプション含めた当社サービスの料金に関するご相談<br>2.支払い方法や支払い条件に関するお問い合わせ',
        },
        consultation: {
            title: '無料相談お申し込み',
            desc: '下記に当てはまる方は、フォームよりお問い合わせください。<br><br>1.当社サービス(ISO認証審査、監査サービスなど)を詳しく説明してほしい<br>2.ISO認証審査（新規取得・審査機関切り替え・手続きスケジュールなど）に関するご相談<br><br>当社スタッフが貴社の状況をお聞きし、最適なご提案をいたします。',
        },
    };

    // --- 初期表示（一般お問い合わせ）を反映 ---
    formDesc.innerHTML = typeConfig.general.desc;

    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            // activeクラスを切り替え
            typeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const type = card.getAttribute('data-type');
            const config = typeConfig[type];

            // フォームタイトル・説明を更新
            formTitle.textContent = config.title;
            formDesc.innerHTML = config.desc;

            // 種別ごとの表示切り替え
            document.querySelectorAll('.general-only').forEach(el => {
                if (el.id === 'howOtherWrap') return; // howOtherWrapは別途制御
                el.style.display = type === 'general' ? 'block' : 'none';
            });
            // 一般お問い合わせに切り替えた時、howOtherWrapをリセット
            if (type === 'general') {
                const howSelect = document.getElementById('how');
                const howOtherWrap = document.getElementById('howOtherWrap');
                howOtherWrap.style.display = howSelect.value === 'other' ? 'block' : 'none';
            }
            document.querySelectorAll('.estimate-only').forEach(el => {
                el.style.display = type === 'estimate' ? 'block' : 'none';
            });
            document.querySelectorAll('.consultation-only').forEach(el => {
                el.style.display = type === 'consultation' ? 'block' : 'none';
            });

            // テキストエリアの必須制御
            const message = document.getElementById('message');
            message.required = type === 'general';
        });
    });

    // --- 「当社を知ったきっかけ」その他入力欄の表示制御 ---
    const howSelect = document.getElementById('how');
    const howOtherWrap = document.getElementById('howOtherWrap');

    if (howSelect) {
        howSelect.addEventListener('change', () => {
            howOtherWrap.style.display = howSelect.value === 'other' ? 'block' : 'none';
        });
    }

    // --- FAQ アコーディオン ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            // 他を閉じる
            document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
            // 同じ項目をクリックしたら閉じる、違う項目なら開く
            if (!isOpen) item.classList.add('open');
        });
    });

    // --- フォーム送信（仮） ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // ここに実際の送信処理を実装
            alert('送信が完了しました。\n2営業日以内にご返信いたします。');
            form.reset();
        });
    }

});
