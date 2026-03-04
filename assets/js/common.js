/* ============================================================
   common.js — 全ページ共通スクリプト
   ※ このファイルは全ページで読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
        header.classList.toggle('scrolled', window.scrollY > 100);
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


    // --- Mobile Dropdown（サービス一覧）---
    const mobileDropdownToggle = document.getElementById('mobileDropdownToggle');
    const mobileDropdownWrap = mobileDropdownToggle
        ? mobileDropdownToggle.closest('.mobile-dropdown')
        : null;

    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', () => {
            mobileDropdownWrap.classList.toggle('open');
        });
    }

});
