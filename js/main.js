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