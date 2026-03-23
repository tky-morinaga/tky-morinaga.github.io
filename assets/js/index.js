/* ============================================================
   index.js — トップページ専用スクリプト（B案リデザイン）
   ※ common.js を読み込んだ後に読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Count-up Animation ---
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                el.innerText = target.toLocaleString();
            }
        };
        update();
    };

    // --- Donut Chart & Count-up trigger ---
    const aboutSection = document.getElementById('about');
    let chartDrawn = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.number').forEach(countUp);

            if (!chartDrawn) {
                chartDrawn = true;
                const ctx = document.getElementById('isoChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['ISO9001', 'ISO14001', 'ISO27001', 'ISO45001'],
                        datasets: [{
                            data: [3500, 1600, 820, 80],
                            backgroundColor: ['#0B3D6E', '#2F80ED', '#7EC8E3', '#C9E8F5'],
                            borderWidth: 0,
                            hoverOffset: 8
                        }]
                    },
                    options: {
                        cutout: '68%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => ` ${ctx.label}：約${ctx.parsed.toLocaleString()}件`
                                }
                            }
                        },
                        animation: {
                            animateRotate: true,
                            duration: 1200,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
            }

            statsObserver.unobserve(aboutSection);
        }
    }, { threshold: 0.4 });

    if (aboutSection) statsObserver.observe(aboutSection);


    // --- フェーズ選択パネル ---
    const phaseBtns = document.querySelectorAll('.phase-btn');
    const panel = document.getElementById('phasePanel');
    const panelDefault = document.getElementById('phasePanelDefault');

    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = btn.getAttribute('data-phase');

            // ボタンのactiveを切り替え
            phaseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // デフォルト非表示
            if (panelDefault) panelDefault.style.display = 'none';

            // 全パネルを非表示
            document.querySelectorAll('.phase-panel-content').forEach(el => {
                el.classList.remove('active');
            });

            // 対象パネルを表示
            const target = document.getElementById('phase' + phase.toUpperCase());
            if (target) {
                target.classList.add('active');
            }

            // パネルに has-content クラスを付与（上部ラインを表示）
            if (panel) panel.classList.add('has-content');
        });
    });


    // --- ジャーニーナビ：スクロール連動アクティブ ---
    const journeySteps = document.querySelectorAll('.journey-step');
    const sections = ['intro', 'empathy', 'iso-intro', 'services', 'vision', 'about'];

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                journeySteps.forEach(step => {
                    step.classList.toggle('active', step.getAttribute('data-section') === id);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });

});