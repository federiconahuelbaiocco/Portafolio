// Menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const body = document.body;
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', function() {
            navList.classList.toggle('activo');
            body.classList.toggle('menu-abierto', navList.classList.contains('activo'));
        });
        // Cierra el menú al hacer click en un enlace
        navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('activo');
                body.classList.remove('menu-abierto');
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