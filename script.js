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
            // モバイルメニューを閉じる
            closeMobileMenu();
        });
    });


    // --- Hamburger / Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            closeMobileMenu();
        }
    });


    // --- Mobile Dropdown (サービス一覧) ---
    const mobileDropdownToggle = document.getElementById('mobileDropdownToggle');
    const mobileDropdownMenu = document.getElementById('mobileDropdownMenu');
    const mobileDropdownWrap = mobileDropdownToggle ? mobileDropdownToggle.closest('.mobile-dropdown') : null;

    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', () => {
            mobileDropdownWrap.classList.toggle('open');
        });
    }

});