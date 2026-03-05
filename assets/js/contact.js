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

            // エラー表示をリセット
            const errorBox = form ? form.querySelector('.form-error-box') : null;
            if (errorBox) errorBox.remove();
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

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

            // consultation-only内のrequired制御
            document.querySelectorAll('.consultation-only [required]').forEach(input => {
                if (type === 'consultation') {
                    input.setAttribute('required', '');
                } else {
                    input.removeAttribute('required');
                }
            });

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

    // --- 日時ピッカー（flatpickr）---
    const dateConfig = {
        locale: 'ja',
        enableTime: true,
        dateFormat: 'Y年m月d日 H:i',
        minuteIncrement: 30,
        minDate: 'today',
        time_24hr: true,
        disableMobile: true,
    };

    flatpickr('#date1', dateConfig);
    flatpickr('#date2', dateConfig);   

    // --- フォーム送信（仮） ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const errors = [];
            const checkedGroups = [];

            // 現在表示されている要素かどうか判定
            const isVisible = (el) => {
                let node = el;
                while (node && node !== form) {
                    const style = window.getComputedStyle(node);
                    if (style.display === 'none') return false;
                    node = node.parentElement;
                }
                return true;
            };

            // 現在の種別を取得
            const activeType = document.querySelector('.type-card.active')?.getAttribute('data-type');

            // 共通必須項目
            const commonRequired = [
                { id: 'company',  label: '会社名' },
                { id: 'name',     label: '氏名' },
                { id: 'email',    label: 'メールアドレス' },
                { id: 'tel',      label: '電話番号' },
            ];

            // 種別ごとの必須項目
            const typeRequired = {
                general: [
                    { id: 'message', label: 'お問い合わせ内容' },
                ],
                estimate: [
                    { id: 'headcount', label: 'お申し込み人数' },
                ],
                consultation: [
                    { id: 'date1',            label: '【第一希望】実施日時' },
                    { id: 'date2',            label: '【第二希望】実施日時' },
                    { id: 'consultHeadcount', label: '従業員数' },
                    { id: 'consultBiz',       label: '事業内容' },
                ],
            };

            // チェックボックスグループの必須項目
            const checkboxRequired = {
                estimate: [
                    { name: 'service', label: 'ご希望のサービス' },
                ],
                consultation: [
                    { name: 'consultService', label: 'ご希望のサービス' },
                ],
            };

            // テキスト系入力チェック
            const checkInput = (id, label) => {
                const el = document.getElementById(id);
                if (!el) return;
                if (el.value.trim() === '') {
                    errors.push(`・${label}は必須です。`);
                    el.classList.add('input-error');
                } else {
                    el.classList.remove('input-error');
                }
            };

            // チェックボックスグループチェック
            const checkCheckbox = (name, label) => {
                const checked = form.querySelectorAll(`input[name="${name}"]:checked`);
                const inputs = form.querySelectorAll(`input[name="${name}"]`);
                if (checked.length === 0) {
                    errors.push(`・${label}は必須です。`);
                    inputs.forEach(el => el.classList.add('input-error'));
                } else {
                    inputs.forEach(el => el.classList.remove('input-error'));
                }
            };

            // 共通項目チェック
            commonRequired.forEach(({ id, label }) => checkInput(id, label));

            // 種別ごとの項目チェック
            (typeRequired[activeType] || []).forEach(({ id, label }) => checkInput(id, label));
            (checkboxRequired[activeType] || []).forEach(({ name, label }) => checkCheckbox(name, label));

            // プライバシーポリシーチェック
            const privacy = document.getElementById('privacy');
            if (privacy && !privacy.checked) {
                errors.push('・プライバシーポリシーへの同意は必須です。');
                privacy.classList.add('input-error');
            } else if (privacy) {
                privacy.classList.remove('input-error');
            }

            // エラー表示
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
            } else {
                if (errorBox) errorBox.remove();
            }

            // --- 送信処理 ---
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '送信中…';

            setTimeout(() => {
                const formWrapper = document.querySelector('.form-wrapper');
                formWrapper.innerHTML = `
                    <div class="submit-complete">
                        <div class="submit-complete-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h2>送信が完了しました</h2>
                        <p>お問い合わせいただきありがとうございます。<br>内容を確認のうえ、担当者よりご連絡いたします。</p>
                        <p class="submit-complete-note">※ 自動返信メールをお送りしております。届かない場合は迷惑メールフォルダをご確認ください。</p>
                        <a href="../index.html" class="btn" style="margin-top:32px;">トップページへ戻る</a>
                    </div>
                `;
            }, 1500);
        });

        // 入力時にエラー状態を解除
        form.addEventListener('input', (e) => {
            e.target.classList.remove('input-error');
            const errorBox = form.querySelector('.form-error-box');
            if (errorBox) errorBox.remove();
        });
    }

});
