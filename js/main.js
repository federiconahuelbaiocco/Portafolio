
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

const STATS_NAMESPACE = 'federico-baiocco-portfolio';
const STATS_KEYS = {
    visits: 'page-views',
    downloads: 'cv-downloads'
};
const STATS_SESSION_KEY = 'stats_counted_visit_v1';

function statsUrl(action, key) {
    return `https://api.countapi.xyz/${action}/${STATS_NAMESPACE}/${key}`;
}

async function statsHit(key) {
    try {
        const response = await fetch(statsUrl('hit', key), {
            cache: 'no-store',
            keepalive: true
        });
        if (!response.ok) return null;
        const data = await response.json();
        const value = Number(data.value);
        return Number.isFinite(value) ? value : null;
    } catch (error) {
        return null;
    }
}

async function statsGet(key) {
    try {
        const response = await fetch(statsUrl('get', key), { cache: 'no-store' });
        if (response.status === 404) return 0;
        if (!response.ok) return null;
        const data = await response.json();
        const value = Number(data.value);
        return Number.isFinite(value) ? value : null;
    } catch (error) {
        return null;
    }
}

function statsSetText(element, value) {
    if (!element) return;
    if (value === null || value === undefined || Number.isNaN(value)) {
        element.textContent = 'n/a';
        return;
    }
    element.textContent = String(value);
}

document.addEventListener('DOMContentLoaded', function () {
    const statsPanel = document.getElementById('stats-panel');
    const statsVisits = document.getElementById('stats-visits');
    const statsDownloads = document.getElementById('stats-downloads');
    const statsClose = document.getElementById('stats-close');
    const btnDownload = document.getElementById('btn-download-cv');

    async function refreshCounts() {
        const [visits, downloads] = await Promise.all([
            statsGet(STATS_KEYS.visits),
            statsGet(STATS_KEYS.downloads)
        ]);
        statsSetText(statsVisits, visits);
        statsSetText(statsDownloads, downloads);
    }

    async function initCounts() {
        const counted = sessionStorage.getItem(STATS_SESSION_KEY);
        if (!counted) {
            sessionStorage.setItem(STATS_SESSION_KEY, '1');
            const visits = await statsHit(STATS_KEYS.visits);
            statsSetText(statsVisits, visits);
        } else {
            const visits = await statsGet(STATS_KEYS.visits);
            statsSetText(statsVisits, visits);
        }

        const downloads = await statsGet(STATS_KEYS.downloads);
        statsSetText(statsDownloads, downloads);
    }

    function setPanelVisible(visible) {
        if (!statsPanel) return;
        statsPanel.classList.toggle('stats-panel--visible', visible);
        statsPanel.setAttribute('aria-hidden', visible ? 'false' : 'true');
        if (visible) {
            refreshCounts();
        }
    }

    function togglePanel() {
        if (!statsPanel) return;
        setPanelVisible(!statsPanel.classList.contains('stats-panel--visible'));
    }

    function shouldShowFromHash() {
        return window.location.hash === '#stats';
    }

    if (statsPanel) {
        if (shouldShowFromHash()) {
            setPanelVisible(true);
        }

        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l') {
                togglePanel();
            }
        });

        if (statsClose) {
            statsClose.addEventListener('click', function () {
                setPanelVisible(false);
            });
        }

        window.addEventListener('hashchange', function () {
            if (shouldShowFromHash()) {
                setPanelVisible(true);
            }
        });
    }

    initCounts();

    if (btnDownload) {
        btnDownload.addEventListener('click', function () {
            statsHit(STATS_KEYS.downloads).then(function (downloads) {
                statsSetText(statsDownloads, downloads);
            });
        });
    }
});
