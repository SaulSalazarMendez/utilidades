import { Campo, CampoCatalogo, Modelo } from "../modelo.js";

export class Tabla extends HTMLElement {
    constructor() {
        super();
        this.acciones = {
            ver: true,
            editar: true,
            clonar: true,
            eliminar: true,
            agregar: true
        };

        this.estado = {
            offset: 0,
            limit: 10,
            total: 0,
            ordenar: {
                campo: 'none',
                orden: 'none'
            }
        }
        /**
         * @type {function(): Promise<any>}
         */
        this.onListar = null;        
    }

    setEstado(estado) {
        this.estado = estado;        
    }
    
    setAcciones(acciones = {}) {
        Object.assign(this.acciones, acciones); 
    }

    setOnListar(onListar) {
        this.onListar = onListar;
    }

    /**
     * 
     * @param {Modelo} modelo 
     */
    carga(modelo) {
        this.modelo = modelo;
        this.tema = this.getAttribute('tema');
        this.titulo = this.getAttribute('titulo');    
        this.render();
        this.tituloAdd = this.shadowRoot.querySelector('#titulo-add');
        this.tituloAdd.innerHTML = this.titulo;  
        this.cargaTitulos();    
        this.cargarDatos();
        this.addEventoNuevo();
        this.addEventosPaginador();
    }

    addEventoNuevo() {
        let nuevo = this.shadowRoot.querySelector('h5');
        if (!this.acciones.agregar) {
            nuevo.remove();
            return;
        }
        nuevo.addEventListener('click', ev=>{
            let evento = new CustomEvent('accion', {
                detail: {
                    tipo: 'nuevo',                    
                }
            });
            this.dispatchEvent(evento);
        });
    }
    validaCadena(cadena) {
        if (cadena == undefined) {
            return '';
        }
        return cadena;
    }
    /**
     * 
     * @param {CampoCatalogo} campo 
     */
    getValorLista(campo, val) {
        let elemento = campo.lista.find(item => item.valor == val);
        if (elemento) {
            return elemento.etiqueta;
        }
        return '';
    }
    /**
     * 
     * @param {[HTMLElement]} btns 
     */
    addEventos(btns) {
        for(let btn of btns) {
            btn.addEventListener('click', ev=> {
                this.despachaEvento(btn);
            });
        }
    }
    /**
     * 
     * @param {HTMLElement} item 
     */
    despachaEvento(item) {
        let evento = new CustomEvent('accion', {
            detail: {
                tipo: item.getAttribute('tipo'),
                id: item.getAttribute('id')
            }
        });
        this.dispatchEvent(evento);
    }

    /**
     * 
     * @param {HTMLElement} item 
     */
    despachaEventoEstado() {
        let evento = new CustomEvent('estado', {
            detail: {
                estado: this.estado
            }
        });
        this.dispatchEvent(evento);
    }

    /**
     * 
     * @param {[HTMLElement]} btns 
     */
    addEventos(btns) {
        for(let btn of btns) {
            btn.addEventListener('click', ev=> {
                this.despachaEvento(btn);
            });
        }
    }
    /**
     * 
     * @param {HTMLElement} item 
     */
    despachaEvento(item) {
        let evento = new CustomEvent('accion', {
            detail: {
                tipo: item.getAttribute('tipo'),
                id: item.getAttribute('id')
            }
        });
        this.dispatchEvent(evento);
    }

    /**
     * 
     * @param {HTMLElement} item 
     */
    despachaEventoEstado() {
        let evento = new CustomEvent('estado', {
            detail: {
                estado: this.estado
            }
        });
        this.dispatchEvent(evento);
    }
}