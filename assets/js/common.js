/* ============================================================
   common.js — 全ページ共通スクリプト
   ※ このファイルは全ページで読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

    // --- Header / Footer 共通パーツ読み込み ---
    const insertHTML = async (selector, url) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const res = await fetch(url);
        el.outerHTML = await res.text();
    };

    await Promise.all([
        insertHTML('#header-placeholder', '/assets/html/header.inc'),
        insertHTML('#footer-placeholder', '/assets/html/footer.inc'),
    ]);

    // ↓ fetch完了後に各種初期化を実行

    // --- Intersection Observer for Fade-in ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 100);
    });


    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            closeMobileMenu();
        });
    });


    // --- Hamburger / Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        if (!hamburger || !mobileMenu) return;
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (header && !header.contains(e.target)) {
            closeMobileMenu();
        }
    });


    // --- Mobile Dropdown（複数対応）---
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.closest('.mobile-dropdown').classList.toggle('open');
        });
    });

    // --- Mobile Sub Menu（複数対応）---
    document.querySelectorAll('.mobile-sub-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.closest('.mobile-sub-wrap').classList.toggle('open');
        });
    });


    // --- Desktop Dropdown 遅延クローズ（複数対応）---
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        let closeTimer = null;
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            dropdown.classList.add('open');
        });
        dropdown.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                dropdown.classList.remove('open');
            }, 200);
        });
    });

});
