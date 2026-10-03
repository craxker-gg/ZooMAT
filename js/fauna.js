// ===== FAUNA =====

// 1. Datos de cada animal
const ANIMALES = [
    {
        nombre: 'Jaguar',
        cientifico: 'Panthera onca',
        categoria: 'felinos',
        etiqueta: 'Felino',
        descripcion: 'El felino más grande de América y símbolo de la selva chiapaneca. Es un excelente nadador y cazador solitario.',
        estado: 'En peligro de extinción',
        imagen: 'img/chiapaneco.jpg'
    },
    {
        nombre: 'Ocelote',
        cientifico: 'Leopardus pardalis',
        categoria: 'felinos',
        etiqueta: 'Felino',
        descripcion: 'Felino de tamaño mediano y hábitos nocturnos, reconocible por las manchas alargadas de su pelaje.',
        estado: 'En peligro de extinción',
        imagen: 'img/ocelote.jpg'
    },
    {
        nombre: 'Guacamaya roja',
        cientifico: 'Ara macao',
        categoria: 'aves',
        etiqueta: 'Ave',
        descripcion: 'Una de las aves más coloridas de México. Vive en parejas que permanecen juntas durante toda su vida.',
        estado: 'En peligro de extinción',
        imagen: 'img/guaca.jpg'
    },
    {
        nombre: 'Quetzal',
        cientifico: 'Pharomachrus mocinno',
        categoria: 'aves',
        etiqueta: 'Ave',
        descripcion: 'Ave sagrada para los pueblos mayas, famosa por las largas plumas verdes de la cola del macho.',
        estado: 'En peligro de extinción',
        imagen: 'img/quetzal.jpg'
    },
    {
        nombre: 'Cocodrilo de río',
        cientifico: 'Crocodylus acutus',
        categoria: 'reptiles',
        etiqueta: 'Reptil',
        descripcion: 'Habita ríos, lagunas y manglares. Puede superar los cuatro metros de largo en su etapa adulta.',
        estado: 'Sujeto a protección especial',
        imagen: 'img/coco.jpg'
    },
    {
        nombre: 'Tapir centroamericano',
        cientifico: 'Tapirus bairdii',
        categoria: 'mamiferos',
        etiqueta: 'Mamífero',
        descripcion: 'El mamífero terrestre más grande de la región. Su trompa flexible le ayuda a alcanzar hojas y frutos.',
        estado: 'En peligro de extinción',
        imagen: 'img/tapir.jpg'
    },
    {
        nombre: 'Mono araña',
        cientifico: 'Ateles geoffroyi',
        categoria: 'mamiferos',
        etiqueta: 'Mamífero',
        descripcion: 'Ágil habitante de las copas de los árboles. Usa su larga cola como una quinta mano para sujetarse.',
        estado: 'En peligro de extinción',
        imagen: 'img/mono.jpg'
    }
];

// 2. Elementos de la página
const listaFauna = document.getElementById('lista-fauna');
const plantilla = document.getElementById('plantilla-tarjeta');
const botonesFiltro = document.querySelectorAll('.filtro');
const contador = document.getElementById('contador-fauna');

// 3. Fabricar una tarjeta a partir de los datos de un animal
function crearTarjeta(animal) {
    const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
    tarjeta.dataset.categoria = animal.categoria;

    const imagen = tarjeta.querySelector('.tarjeta__imagen');
    imagen.src = animal.imagen;
    imagen.alt = animal.nombre;
    imagen.loading = 'lazy';

    tarjeta.querySelector('.tarjeta__categoria').textContent = animal.etiqueta;
    tarjeta.querySelector('.tarjeta__nombre').textContent = animal.nombre;
    tarjeta.querySelector('.tarjeta__cientifico').textContent = animal.cientifico;
    tarjeta.querySelector('.tarjeta__descripcion').textContent = animal.descripcion;
    tarjeta.querySelector('.tarjeta__estado').textContent = animal.estado;

    return tarjeta;
}

// 4. Poner todas las tarjetas en la página
ANIMALES.forEach((animal) => {
    listaFauna.appendChild(crearTarjeta(animal));
});

// 5. Mostrar solo las tarjetas de una categoría
function filtrar(categoria) {
    let visibles = 0;

    listaFauna.querySelectorAll('.tarjeta').forEach((tarjeta) => {
        const mostrar = categoria === 'todos' || tarjeta.dataset.categoria === categoria;
        tarjeta.hidden = !mostrar;
        if (mostrar) visibles++;
    });

    botonesFiltro.forEach((boton) => {
        boton.setAttribute('aria-pressed', boton.dataset.filtro === categoria);
    });

    contador.textContent = visibles === 1
        ? 'Mostrando 1 especie'
        : `Mostrando ${visibles} especies`;
}

// 6. Conectar los botones de filtro
botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => filtrar(boton.dataset.filtro));
});

// 7. Estado inicial: mostrar todas
filtrar('todos');