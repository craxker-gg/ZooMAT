// ===== MENÚ HAMBURGUESA =====
const botonMenu = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const iconoMenu = botonMenu.querySelector('i');

function actualizarMenu(abierto) {
    menu.classList.toggle('navbar__menu--abierto', abierto);
    botonMenu.setAttribute('aria-expanded', abierto);
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    iconoMenu.className = abierto ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

botonMenu.addEventListener('click', () => {
    const estaAbierto = menu.classList.contains('navbar__menu--abierto');
    actualizarMenu(!estaAbierto);
});

menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => actualizarMenu(false));
});

// ===== AÑO DEL PIE DE PÁGINA =====
const anioActual = document.getElementById('anio');
if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}