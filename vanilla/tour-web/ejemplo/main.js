import {Tour} from './../tour-web.js';

const tour = new Tour();

tour.addPaso({
    target: '#tour-js',
    contenido: `<p>Libreria para dar tours</p>`,
    posicion: 'botton',
    acciones:[
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#setup',
    contenido: `<p>Aqui indicamos como inicializar el tour en la app</p>`,
    posicion: 'botton',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#clase-tour',
    contenido: `<p>se define los métodos de la clase tour.</p>`,
    posicion: 'top',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#addpaso',
    contenido: `<p>Para agregar un paso se tiene que usar un objecto con forma de <b>ipaso</b></p>`,
    posicion: 'top',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#definicion-de-pasoipaso',
    contenido: `<p>Aqui se define lo que es un <b>ipaso</b></p>`,
    posicion: 'botton',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#iaccion',
    contenido: `<p>Notar que las acciones se agregan como estructuras <b>iaccion</b></p>`,
    posicion: 'top',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente
        }
    ]
});

tour.addPaso({
    target: '#definición-de-accioniaccion',
    contenido: `<p>Aqui se define que es una <b>iaccion</b></p>`,
    posicion: 'botton',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Siguiente',
            accion: tour.siguiente,
        }
    ]
});

tour.addPaso({
    target: '#tour-js',
    contenido: `<p>Con esto terminamos el tour</p>`,
    posicion: 'botton',
    acciones:[
        {
            texto: 'Atras',
            accion: tour.atras
        },
        {
            texto: 'Finalizar',
            accion: tour.siguiente,
            class: 'red'
        }
    ]
});
tour.inicia();