
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const body = document.body;
    const header = document.querySelector('header');

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.scrollY;
        const diff = Math.max(0, targetY) - startY;
        if (Math.abs(diff) < 1) return;
        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeInOutCubic(t);
            window.scrollTo(0, startY + diff * eased);
            if (t < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', function () {
            navList.classList.toggle('activo');
            body.classList.toggle('menu-abierto', navList.classList.contains('activo'));
        });

        navList.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                const hash = this.getAttribute('href');
                const target = document.querySelector(hash);
                if (!target) return;
                e.preventDefault();

                navList.classList.remove('activo');
                body.classList.remove('menu-abierto');

                const headerHeight = header ? header.getBoundingClientRect().height : 0;
                const targetY = Math.round(target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 8));

                if (header) header.classList.remove('header-oculto');
                smoothScrollTo(targetY, 900);
            });
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth <= 700) {
            menuBtn.style.display = 'flex';
        } else {
            menuBtn.style.display = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const bienvenidaTexto = document.getElementById('bienvenida-animada-texto');
    if (bienvenidaTexto) {
        const texto = '¡Bienvenido a mi portafolio!';
        let i = 0;
        function escribir() {
            if (i <= texto.length) {
                bienvenidaTexto.textContent = texto.slice(0, i);
                i++;
                setTimeout(escribir, 70);
            }
        }
        escribir();
    }
});

function setDarkMode(active) {
    if (active) {
        document.body.classList.add('dark-mode');
        document.getElementById('icono-modo').textContent = '🌙';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('icono-modo').textContent = '☀️';
    }
}
function guardarPreferencia(modoOscuro) {
    localStorage.setItem('theme_pref_v2', modoOscuro ? '1' : '0');
}
function obtenerPreferencia() {
    return localStorage.getItem('theme_pref_v2') === '0' ? false : true;
}
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('toggle-dark');
    if (!btn) return;
    let modoOscuro = obtenerPreferencia();
    setDarkMode(modoOscuro);
    btn.addEventListener('click', function () {
        modoOscuro = !document.body.classList.contains('dark-mode');
        setDarkMode(modoOscuro);
        guardarPreferencia(modoOscuro);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const navList = document.getElementById('nav-list');
    let prevY = window.scrollY;
    let ticking = false;
    function onScroll() {
        const currentY = window.scrollY;
        const bajando = currentY > prevY;
        prevY = currentY;

        const menuAbierto = document.body.classList.contains('menu-abierto');
        if (!header) return;
        if (!menuAbierto) {
            if (bajando && currentY > 10) {
                header.classList.add('header-oculto');
            } else {
                header.classList.remove('header-oculto');
            }
        }

        if (currentY > 0) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    onScroll();


    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                navLinks.forEach(link => link.classList.remove('active'));


                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-list a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    const btnBackToTop = document.getElementById('btn-back-to-top');

    if (btnBackToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnBackToTop.classList.add('show');
            } else {
                btnBackToTop.classList.remove('show');
            }
        });

        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    const staggerContainers = document.querySelectorAll('.proyectos');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.card, .tech-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, index * 150);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px' });

    staggerContainers.forEach(container => {

        const cards = container.querySelectorAll('.card, .tech-card');
        cards.forEach(card => card.classList.add('card-hidden'));


        staggerObserver.observe(container);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const btnDownload = document.getElementById('btn-download-cv');
    const toastEl = document.getElementById('cv-toast');

    if (btnDownload && toastEl) {

        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });

        btnDownload.addEventListener('click', function () {
            toast.show();
        });
    }
});
