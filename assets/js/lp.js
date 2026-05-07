/* ============================================================
   lp.js — LP専用スクリプト（/lp/index.html）
   ※ common.js を読み込んだ後に読み込む
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- フェーズ選択パネル ---
    const phaseBtns = document.querySelectorAll('.lp-phase-btn');
    const panel = document.getElementById('lpPhasePanel');
    const panelDefault = document.getElementById('lpPhasePanelDefault');

    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = btn.getAttribute('data-phase');
            phaseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (panelDefault) panelDefault.style.display = 'none';
            document.querySelectorAll('.lp-panel-content').forEach(el => {
                el.classList.remove('active');
            });
            const target = document.getElementById('lpPhase' + phase.toUpperCase());
            if (target) target.classList.add('active');
            if (panel) panel.classList.add('has-content');
        });
    });

    // --- FAQ アコーディオン ---
    document.querySelectorAll('.lp-faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.lp-faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.lp-faq-item.open').forEach(el => el.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // --- Count-up ---
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
    const aboutSection = document.getElementById('lp-about');
    let chartDrawn = false;

    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.lp-stat-number').forEach(countUp);
                if (!chartDrawn) {
                    chartDrawn = true;
                    const ctx = document.getElementById('lpIsoChart');
                    if (ctx) {
                        new Chart(ctx.getContext('2d'), {
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
                }
                statsObserver.unobserve(aboutSection);
            }
        }, { threshold: 0.4 });
        statsObserver.observe(aboutSection);
    }

});