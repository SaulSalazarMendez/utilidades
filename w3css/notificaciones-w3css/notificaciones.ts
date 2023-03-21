/**
 * Define los tres tipos de notifiaciones
 */
export const NOTIFICACION = {
    ALERT: 'w3-red',
    SUCCESS: 'w3-green',
    WARNING: 'w3-yellow'
};

/**
 * Define el evento de cerrar para la notificación
 * @param {*} div 
 * @param {*} span 
 * @param {*} reloj 
 */
function addListenerCerrar(div: HTMLElement, span: HTMLElement, reloj: number) {
    span.addEventListener('click', ev => {
        clearInterval(reloj);
        div.remove();
    });
}

interface iopciones{
    tipo: string;
    titulo: string;
    mensaje: string;
    tiempo?: number;
    w3css?: string;
}

const OPCIONES = {
    tipo: NOTIFICACION.SUCCESS,
    titulo: 'Título',
    mensaje: 'Mensaje',
    tiempo: 5000,
    w3css: 'https://www.w3schools.com/w3css/4/w3.css'
};

function getOpciones(){
    return JSON.parse(JSON.stringify(OPCIONES));
} 


/**
 * Agrega ewl div contenedor de notificaciones
 */
function addNoticiaciones() {
    let div = document.createElement('div');
    div.id = 'notificaciones-de-la-app';
    div.style.cssText = 'position: fixed; bottom: 0; right: 20px; height: auto; z-index: 10000;';
    let body = document.querySelector('body');
    if (body)
        body.append(div);
    return div;
}
/**
 * Agrega una notifiacion, que se cerrara automaticamente.
 * Estas dependen de w3.css para los estilos.
 * @param {OPCIONES} opciones Define como muestra la notificacion
 */
export function addNotificacion(opciones:iopciones = OPCIONES) {
    let _opciones = Object.assign(getOpciones(), opciones);
    let div = document.createElement('div');
    div.attachShadow({mode: 'open'});
    div.style.minWidth = '200px';
    if (!div.shadowRoot) return;    
    div.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${_opciones.w3css}">
        <style>
        .loader {
            border: 4px solid #f3f3f3;
            border-radius: 40%;
            border-top: 4px solid blue;            
            width: 30px;
            height: 30px;         
            animation: spin 1s linear infinite;
        }
        div#cargando{
            padding-left: calc(50% - 15px);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        </style>        
        <div id ="cargando">
        <div class="loader" title="cargando"></div>
        </div>
        <div class="w3-panel w3-card-4 w3-display-container  ${_opciones.tipo}" id="contenido" style="display: none;">
            <span
                class="w3-button ${_opciones.tipo} w3-large w3-display-topright">&times;</span>
            <h3>${_opciones.titulo}</h3>
            <p>${_opciones.mensaje}</p>
            <div class="w3-border w3-grey">
            <div class="w3-blue" style="height:5px;width:0" tiempo></div>
            </div>
            <br>
        </div>   
    `;    
    
    let span = div.shadowRoot.querySelector('span');    
    let barra = div.shadowRoot.querySelector('[tiempo]');
    if (!barra) return;
    let contadorTiempo = 0;
    let reloj = setInterval(() => {
        contadorTiempo += 10;
        if (contadorTiempo > _opciones.tiempo) {
            clearInterval(reloj);
            div.remove();          
        } else {
            const ancho =  (contadorTiempo/_opciones.tiempo)*100;
            // @ts-ignore
            barra.style.width = ancho + '%';            
        }
    }, 10);
    if(span)
    addListenerCerrar(div, span, reloj);
    let notificaciones = document.querySelector('#notificaciones-de-la-app');
    if (!notificaciones) {
        notificaciones = addNoticiaciones();
    }
    let cargando = div.shadowRoot.querySelector('#cargando');
    let contenido = div.shadowRoot.querySelector('#contenido');    
    let link = div.shadowRoot.querySelector('link');
    //esperamos a que termine la carga
    // @ts-ignore
    link.onload = () => {
        // @ts-ignore
        cargando.remove();
        // @ts-ignore
        contenido.style.display = 'block';
    };    
    notificaciones.appendChild(div);  
}