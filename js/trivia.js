// ===== TRIVIA Y DIPLOMA =====

// 1. Preguntas y configuración
const PREGUNTAS = [
    {
        pregunta: '¿Cuál es el felino más grande de América?',
        opciones: ['Puma', 'Jaguar', 'Ocelote', 'Lince'],
        correcta: 1,
        explicacion: 'El jaguar es el felino más grande del continente y el tercero más grande del mundo.'
    },
    {
        pregunta: '¿Qué ave era sagrada para los pueblos mayas por sus largas plumas verdes?',
        opciones: ['Guacamaya roja', 'Tucán', 'Quetzal', 'Colibrí'],
        correcta: 2,
        explicacion: 'Las plumas del quetzal eran tan valiosas que solo la nobleza maya podía usarlas.'
    },
    {
        pregunta: '¿Para qué usa el mono araña su larga cola?',
        opciones: [
            'Para sujetarse de las ramas, como una quinta mano',
            'Para nadar en los ríos',
            'Para defenderse de sus depredadores',
            'Para guardar calor durante la noche'
        ],
        correcta: 0,
        explicacion: 'Su cola es tan fuerte que puede sostener todo su peso colgado de una rama.'
    },
    {
        pregunta: '¿Cuál es el mamífero terrestre más grande de la región?',
        opciones: ['Venado cola blanca', 'Jaguar', 'Pecarí', 'Tapir'],
        correcta: 3,
        explicacion: 'El tapir centroamericano puede pesar más de 250 kilos.'
    },
    {
        pregunta: '¿Quién fue Miguel Álvarez del Toro, cuyo nombre lleva el zoológico?',
        opciones: [
            'Un gobernador de Chiapas',
            'Un naturalista dedicado a estudiar y proteger la fauna chiapaneca',
            'El fundador de Tuxtla Gutiérrez',
            'Un explorador español'
        ],
        correcta: 1,
        explicacion: 'Dedicó su vida a la investigación y conservación de la naturaleza de Chiapas.'
    }
];

const MINIMO_ACIERTOS = 4;

// 2. Estado de la trivia (cambia mientras se juega)
let indiceActual = 0;
let aciertos = 0;

// 3. Elementos de la página
const pantallaPreguntas = document.getElementById('pantalla-preguntas');
const pantallaResultado = document.getElementById('pantalla-resultado');
const pantallaDiploma = document.getElementById('pantalla-diploma');

const contadorPregunta = document.getElementById('trivia-contador');
const barraRelleno = document.getElementById('trivia-barra-relleno');
const textoPregunta = document.getElementById('trivia-pregunta');
const contenedorOpciones = document.getElementById('trivia-opciones');
const textoRetro = document.getElementById('trivia-retro');
const botonSiguiente = document.getElementById('trivia-siguiente');

const resultadoTitulo = document.getElementById('resultado-titulo');
const resultadoTexto = document.getElementById('resultado-texto');
const formDiploma = document.getElementById('form-diploma');
const campoNombre = document.getElementById('nombre-visitante');
const botonReintentar = document.getElementById('trivia-reintentar');

const diplomaNombre = document.getElementById('diploma-nombre');
const diplomaDetalle = document.getElementById('diploma-detalle');
const botonImprimir = document.getElementById('diploma-imprimir');
const botonReiniciar = document.getElementById('diploma-reiniciar');

// 4. Cambiar de pantalla
function mostrarPantalla(pantalla) {
    pantallaPreguntas.hidden = pantalla !== pantallaPreguntas;
    pantallaResultado.hidden = pantalla !== pantallaResultado;
    pantallaDiploma.hidden = pantalla !== pantallaDiploma;
}

// 5. Mostrar la pregunta actual
function mostrarPregunta() {
    const actual = PREGUNTAS[indiceActual];

    contadorPregunta.textContent = `Pregunta ${indiceActual + 1} de ${PREGUNTAS.length}`;
    barraRelleno.style.width = `${(indiceActual / PREGUNTAS.length) * 100}%`;
    textoPregunta.textContent = actual.pregunta;

    textoRetro.textContent = '';
    textoRetro.className = 'trivia__retro';
    botonSiguiente.hidden = true;

    contenedorOpciones.innerHTML = '';
    actual.opciones.forEach((texto, indice) => {
        const boton = document.createElement('button');
        boton.className = 'trivia__opcion';
        boton.textContent = texto;
        boton.addEventListener('click', () => responder(indice, boton));
        contenedorOpciones.appendChild(boton);
    });
}

// 6. Revisar la respuesta elegida
function responder(elegida, botonElegido) {
    const actual = PREGUNTAS[indiceActual];
    const botones = contenedorOpciones.querySelectorAll('.trivia__opcion');

    botones.forEach((boton, indice) => {
        boton.disabled = true;
        if (indice === actual.correcta) {
            boton.classList.add('trivia__opcion--correcta');
        }
    });

    if (elegida === actual.correcta) {
        aciertos++;
        textoRetro.textContent = `¡Correcto! ${actual.explicacion}`;
        textoRetro.classList.add('trivia__retro--bien');
    } else {
        botonElegido.classList.add('trivia__opcion--incorrecta');
        textoRetro.textContent = `No es correcto. ${actual.explicacion}`;
        textoRetro.classList.add('trivia__retro--mal');
    }

    const esLaUltima = indiceActual === PREGUNTAS.length - 1;
    botonSiguiente.textContent = esLaUltima ? 'Ver resultado' : 'Siguiente pregunta';
    botonSiguiente.hidden = false;
    botonSiguiente.focus();
}

// 7. Mostrar el resultado final
function mostrarResultado() {
    const aprobo = aciertos >= MINIMO_ACIERTOS;

    if (aprobo) {
        resultadoTitulo.textContent = '¡Felicidades!';
        resultadoTexto.textContent = `Obtuviste ${aciertos} de ${PREGUNTAS.length} respuestas correctas. Ya puedes generar tu diploma.`;
    } else {
        resultadoTitulo.textContent = 'Casi lo logras';
        resultadoTexto.textContent = `Obtuviste ${aciertos} de ${PREGUNTAS.length} respuestas correctas. Necesitas al menos ${MINIMO_ACIERTOS} para obtener tu diploma.`;
    }

    formDiploma.hidden = !aprobo;
    mostrarPantalla(pantallaResultado);
}

// 8. Generar el diploma
function generarDiploma(evento) {
    evento.preventDefault();

    const nombre = campoNombre.value.trim();
    if (!nombre) return;

    const fecha = new Date().toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    diplomaNombre.textContent = nombre;
    diplomaDetalle.textContent = `${aciertos} de ${PREGUNTAS.length} aciertos. Tuxtla Gutiérrez, Chiapas, ${fecha}.`;
    mostrarPantalla(pantallaDiploma);
}

// 9. Empezar de nuevo
function reiniciar() {
    indiceActual = 0;
    aciertos = 0;
    campoNombre.value = '';
    mostrarPantalla(pantallaPreguntas);
    mostrarPregunta();
}

// 10. Conectar los botones
botonSiguiente.addEventListener('click', () => {
    indiceActual++;
    if (indiceActual < PREGUNTAS.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

formDiploma.addEventListener('submit', generarDiploma);
botonReintentar.addEventListener('click', reiniciar);
botonReiniciar.addEventListener('click', reiniciar);
botonImprimir.addEventListener('click', () => window.print());

// 11. Empezar con la primera pregunta
mostrarPregunta();