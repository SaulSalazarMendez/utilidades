
interface iaccion{
    /** texto del boton*/
    texto: string;
    /** clase que se aplicara */
    class?: string;
    /** accion del objecto tipo Tour */
    accion: () => void;
}


export interface iPaso{
    /**
     * contenido de la modal
     */
    contenido: string;
    /**
     * Selector objectivo
     */
    target: string;
    /**posicion en la que va el modal */
    posicion: 'top' | 'botton';
    /**lista de botones de acciones */
    acciones: iaccion[]
}

function remueve() {
    if (this.div && this.pico && this.divBack && this.divTarget){
        this.div.remove();
        this.pico.remove();
        this.divBack.remove();
        this.divTarget.remove();
    }
    this.div = null;
    this.pico = null;
    this.divBack = null;
    this.divTarget = null;
}

function render() {
    if (this.div) {
        remueve.bind(this)();
    }
    if (this.ipaso == -1 || this.ipaso >= this.pasos.length) return;
    this.div = document.createElement('div');
    this.div.classList.add('_modal_tour');

    this.divTarget = document.createElement('div');
    this.divTarget.classList.add('target_border');

    this.pico = document.createElement('div');
    this.divBack = document.createElement('div');
    this.divBack.classList.add('tour-back');
    const paso = this.pasos[this.ipaso]; 
    if (paso.posicion == 'top')
        this.pico.classList.add('_flecha-abajo');
    else 
        this.pico.classList.add('_flecha-arriba');
    document.body.append(this.divBack);
    document.body.append(this.div);
    document.body.append(this.pico);
    document.body.append(this.divTarget);
    this.div.innerHTML = paso.contenido;
    let target = document.querySelector(paso.target) as HTMLElement;
    let cr: any = null;
    if (!target){
        cr = [{
            top: 0,
            left: 0,
            width: 100,
            height: 20
        }];
    } else {
        cr = target.getClientRects();
    }
    const [top, left, ancho, alto] = [cr[0].top, cr[0].left, cr[0].width, cr[0].height];
    addBotones.bind(this)(this.div, paso);
    addListenersBotones.bind(this)(this.div);
    
            
    Object.assign(this.div.style, {
        top: top+'px',
        left: 1+'px',
        height: 'auto',
        maxWidth: '300px',
        position: 'absolute',
        background: 'white',
        zIndex: 2001,
        visibility: 'hidden',
        borderRadius: '5px'
    });
    let topPico = top - 21;
    if (paso.posicion == 'botton')
        topPico = top + alto;
    Object.assign(this.pico.style, {
        top: (topPico + window.scrollY)+'px',
        left: (left + ancho/2 - 5) +'px',
        position: 'absolute',
        zIndex: 2001,
    });
    Object.assign(this.divTarget.style, {
        top: (top + window.scrollY) + 'px',
        left: left + 'px',
        width: ancho + 'px',
        height: alto + 'px',
        position: 'absolute',
        zIndex: 2001,
    });

    let anchodiv = this.div.clientWidth;
    let leftDiv = left + ancho/2 - anchodiv/2;
    if ((leftDiv + anchodiv) > document.documentElement.clientWidth ) {
        leftDiv = (left + ancho) - anchodiv + 5;
    }else if (leftDiv < 0) {
        leftDiv = left;
    }
    let topDiv =  top - this.div.clientHeight - 20;
    if (paso.posicion != 'top')
        topDiv = alto + top + 10 ;
    Object.assign(this.div.style, {
        top: (topDiv + window.scrollY)+'px',
        left: leftDiv + 'px',
        visibility: ''
    });
    mueveScroll.bind(this)(top-2*this.div.clientHeight + window.scrollY);
}

function addBotones(div: HTMLElement, paso: iPaso) {
    let botones = '';
    paso.acciones.forEach(item => {
        const clase = item.class ? ' class="' +item.class + '"' : '';
        botones += `<button ${clase}>${item.texto}</button>`; 
    });
    div.innerHTML += /*html*/ `
    <div class='_botones'>
        ${botones}
    </div>
    `;
}
/**
 * 
 * @param {HTMLElement} btn 
 * @param {*} indice 
 */
function addListerBoton(btn: HTMLElement, indice: number){
    btn.addEventListener('click', ()=>{
        const fun = this.pasos[this.ipaso].acciones[indice].accion;
        if (fun){
            fun.bind(this)();
        }
    })
}

function addListenersBotones(div: HTMLElement) {
    const divBotones = div.querySelector('._botones') as HTMLElement;
    const botones = divBotones.querySelectorAll('button');
    botones.forEach((item,index) => {
        addListerBoton.bind(this)(item, index);
    });
}

function mueveScroll(top: number) {
    window.scroll({
        top: top,
        behavior: "smooth",
    });
}

export class Tour{
    pasos: iPaso[];
    ipaso: number;
    div: HTMLElement | null;
    pico: HTMLElement | null;
    divBack: HTMLElement | null;
    divTarget: HTMLElement | null;

    constructor(pasos: iPaso[] = []) {
        this.pasos = pasos;
        this.ipaso = -1;
        this.div = null;
        this.pico = null;
        this.divBack = null;
        this.divTarget = null;
    }

    inicia() {
        this.ipaso = 0;
        render.bind(this)();
    }

    addPaso(paso: iPaso) {
        this.pasos.push(paso);
    }

    atras() {
        this.ipaso --;
        render.bind(this)();
    }

    siguiente() {
        this.ipaso ++;
        render.bind(this)();

    }

    esActivo() {
        return this.div ? true : false;
    }

    cancelar() {
        remueve.bind(this)();
    }
}