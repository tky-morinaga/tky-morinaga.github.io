/**
 * services.js — services/ ページ共用JS
 * iso-audit.html のページ内タブナビ アクティブ制御
 */

(function () {
  'use strict';

  const tabNav = document.getElementById('service-tab-nav');
  if (!tabNav) return;

  const items = tabNav.querySelectorAll('.service-tab-nav__item');
  const sections = Array.from(items).map(item =>
    document.getElementById(item.dataset.target)
  );

  // IntersectionObserver でスクロール位置に応じてアクティブタブを切り替え
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          items.forEach(item => {
            item.classList.toggle('active', item.dataset.target === id);
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach(sec => { if (sec) observer.observe(sec); });

  // ハッシュ初期化：URLに #iso / #audit / #internal があれば対応タブをアクティブに
  const hash = location.hash.replace('#', '');
  if (hash) {
    items.forEach(item => {
      item.classList.toggle('active', item.dataset.target === hash);
    });
  }
})();