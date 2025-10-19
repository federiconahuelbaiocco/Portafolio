// Menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function() {
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
        if (Math.abs(diff) < 1) return; // nada que animar
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
        menuBtn.addEventListener('click', function() {
            navList.classList.toggle('activo');
            body.classList.toggle('menu-abierto', navList.classList.contains('activo'));
        });
        // Desplazamiento suave y cierre de menú al hacer click en un enlace
        navList.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const hash = this.getAttribute('href');
                const target = document.querySelector(hash);
                if (!target) return; // si no hay destino, dejar comportamiento por defecto
                e.preventDefault();
                // cerrar menú móvil antes de desplazar
                navList.classList.remove('activo');
                body.classList.remove('menu-abierto');
                // calcular offset por header sticky
                const headerHeight = header ? header.getBoundingClientRect().height : 0;
                const targetY = Math.round(target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 8));
                // asegurar que el header esté visible antes/después
                if (header) header.classList.remove('header-oculto');
                smoothScrollTo(targetY, 900);
            });
        });
    }
    // Siempre mostrar el botón hamburguesa en móviles
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 700) {
            menuBtn.style.display = 'flex';
        } else {
            menuBtn.style.display = '';
        }
    });
});
// Animación máquina de escribir para mensaje de bienvenida
document.addEventListener('DOMContentLoaded', function() {
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
// Script para modo oscuro/claro
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
    localStorage.setItem('modoOscuro', modoOscuro ? '1' : '0');
}
function obtenerPreferencia() {
    return localStorage.getItem('modoOscuro') === '0' ? false : true;
}
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('toggle-dark');
    if (!btn) return;
    let modoOscuro = obtenerPreferencia();
    setDarkMode(modoOscuro);
    btn.addEventListener('click', function() {
        modoOscuro = !document.body.classList.contains('dark-mode');
        setDarkMode(modoOscuro);
        guardarPreferencia(modoOscuro);
    });
});
// Ocultar header al desplazarse hacia abajo y mostrar al subir
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navList = document.getElementById('nav-list');
    let prevY = window.scrollY;
    let ticking = false;
    function onScroll() {
        const currentY = window.scrollY;
        const bajando = currentY > prevY;
        prevY = currentY;
        // No ocultar si el menú móvil está abierto
        const menuAbierto = document.body.classList.contains('menu-abierto');
        if (!header) return;
        if (!menuAbierto) {
            if (bajando && currentY > 10) {
                header.classList.add('header-oculto');
            } else {
                header.classList.remove('header-oculto');
            }
        }
        // Sombra cuando hay desplazamiento
        if (currentY > 0) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
        ticking = false;
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    // Ejecutar una vez al cargar para aplicar sombra si inicia desplazado
    onScroll();
});