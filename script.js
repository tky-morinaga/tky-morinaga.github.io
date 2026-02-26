document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Fade-in ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

    const aboutSection = document.getElementById('about');
    let chartDrawn = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.number').forEach(countUp);

            // --- Donut Chart ---
            if (!chartDrawn) {
                chartDrawn = true;
                const ctx = document.getElementById('isoChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['ISO9001', 'ISO14001', 'ISO27001', 'ISO45001'],
                        datasets: [{
                            data: [3500, 1600, 800, 80],
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

    statsObserver.observe(aboutSection);


    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
             }
        });
    });

});