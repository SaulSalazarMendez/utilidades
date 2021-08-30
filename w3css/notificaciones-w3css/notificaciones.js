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
function addListenerCerrar(div, span, reloj) {
    span.addEventListener('click', ev => {
        clearInterval(reloj);
        div.remove();
    });
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
    body.append(div);
    return div;
}
/**
 * Agrega una notifiacion, que se cerrara automaticamente.
 * Estas dependen de w3.css para los estilos.
 * @param {OPCIONES} opciones Define como muestra la notificacion
 */
export function addNotificacion(opciones = {}) {
    let _opciones = Object.assign(getOpciones(), opciones);
    let div = document.createElement('div');
    div.attachShadow({mode: 'open'});
    div.style.minWidth = '200px';    
    div.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${_opciones.w3css}">
        <div class="w3-panel w3-card-4 w3-display-container  ${_opciones.tipo}">
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
    let contadorTiempo = 0;
    let reloj = setInterval((t) => {
        contadorTiempo += 10;
        if (contadorTiempo > _opciones.tiempo) {
            clearInterval(reloj);
            div.remove();          
        } else {
            const ancho =  (contadorTiempo/_opciones.tiempo)*100;
            barra.style.width = ancho + '%';            
        }
    }, 10);
    addListenerCerrar(div, span, reloj);
    let notificaciones = document.querySelector('#notificaciones-de-la-app');
    if (!notificaciones) {
        notificaciones = addNoticiaciones();
    }
    notificaciones.appendChild(div);
}