// ===== MAPA INTERACTIVO =====

// 1. Datos de cada estación
const ESTACIONES = {
    cocodrilo: {
        titulo: 'Museo del Cocodrilo',
        km: '0.4',
        imagen: 'img/museo coco.jpg',
        descripcion: 'Espacio dedicado a los cocodrilianos de Chiapas, con estanques donde se pueden observar de cerca y conocer su importancia para los ecosistemas acuáticos.',
        puntos: [
            'Cocodrilo de río y cocodrilo de pantano',
            'Caimán',
            'Información sobre su conservación'
        ]
    },
    aviario: {
        titulo: 'Aviario',
        km: '0.9',
        imagen: 'img/aviario.jpg',
        descripcion: 'Un recorrido entre aves de la región, desde especies de colores intensos hasta aves rapaces, en un ambiente rodeado de vegetación.',
        puntos: [
            'Guacamaya roja',
            'Tucanes',
            'Aves rapaces'
        ]
    },
    felinario: {
        titulo: 'Felinario',
        km: '1.4',
        imagen: 'img/felinario.jpg',
        descripcion: 'Área de los grandes felinos de Chiapas. Aquí se encuentra el jaguar, símbolo de la selva y de la identidad del zoológico.',
        puntos: [
            'Jaguar',
            'Puma',
            'Ocelote y tigrillo'
        ]
    },
    nocturna: {
        titulo: 'Casa Nocturna',
        km: '1.8',
        imagen: 'img/casa.jpg',
        descripcion: 'Un espacio con poca luz que simula la noche, para observar a los animales que están activos cuando el resto de la selva duerme.',
        puntos: [
            'Murciélagos',
            'Mamíferos nocturnos',
            'Aves nocturnas'
        ]
    },
    herpetario: {
        titulo: 'Herpetario',
        km: '2.1',
        imagen: 'img/herpetario.jpg',
        descripcion: 'Exhibición de reptiles y anfibios de la región, con información sobre cómo identificarlos y por qué son importantes para el equilibrio natural.',
        puntos: [
            'Serpientes de la región',
            'Lagartijas e iguanas',
            'Anfibios'
        ]
    },
    cafeteria: {
        titulo: 'Cafetería y descanso',
        km: '2.4',
        imagen: 'img/cafeteria.jpg',
        descripcion: 'Zona de descanso con sombra al final del recorrido, ideal para tomar algo y recuperar energía antes de salir.',
        puntos: [
            'Alimentos y bebidas',
            'Áreas con sombra',
            'Sanitarios'
        ]
    }
};

// 2. Elementos de la página que vamos a usar
const estacionesMapa = document.querySelectorAll('.mapa__estacion');
const panelImagen = document.getElementById('estacion-imagen');
const panelKm = document.getElementById('estacion-km');
const panelTitulo = document.getElementById('estacion-titulo');
const panelDescripcion = document.getElementById('estacion-descripcion');
const panelLista = document.getElementById('estacion-lista');

// 3. Función que muestra una estación en el panel
function seleccionarEstacion(clave) {
    const estacion = ESTACIONES[clave];
    if (!estacion) return;

    panelImagen.src = estacion.imagen;
    panelImagen.alt = estacion.titulo;
    panelKm.textContent = `Kilómetro ${estacion.km}`;
    panelTitulo.textContent = estacion.titulo;
    panelDescripcion.textContent = estacion.descripcion;

    panelLista.innerHTML = '';
    estacion.puntos.forEach((punto) => {
        const elemento = document.createElement('li');
        elemento.textContent = punto;
        panelLista.appendChild(elemento);
    });

    estacionesMapa.forEach((nodo) => {
        nodo.classList.toggle('mapa__estacion--activa', nodo.dataset.estacion === clave);
    });
}

// 4. Conectar cada estación con la función
estacionesMapa.forEach((nodo) => {
    nodo.addEventListener('click', () => {
        seleccionarEstacion(nodo.dataset.estacion);
    });

    nodo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
            evento.preventDefault();
            seleccionarEstacion(nodo.dataset.estacion);
        }
    });
});

// 5. Mostrar la primera estación al cargar la página
seleccionarEstacion('cocodrilo');