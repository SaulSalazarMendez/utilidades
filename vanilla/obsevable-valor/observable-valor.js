let con = 0;
export class Observable {
    constructor(dato) {
        this.fun = null;
        this.valor = dato;
        this.listaObservadores = [];
        this.id = con ++;
    }
    /**
     * Envia el siguiente valor
     * @param {*} nuevo 
     */
    sig(nuevo) {
        this.valor = nuevo;
        for (let ob of this.listaObservadores) {
            if (ob.fun) {
                const tiempo = 1;                
                setTimeout(()=>{ob.fun(nuevo);}, tiempo);
            }
        }
    }
    /**
     * Regresa el último valor
     */
    ultimo() {
        return this.valor;
    }
    /**
     * se subscriben a los cambios del observable
     * @param {Function} fun 
     */
    observa(fun) {
        let ob = new Observable(null);
        ob.fun = fun;
        this.listaObservadores.push(ob);
        return ob;
    }
    /**
     * Se desuscribe del observable
     * @param {Observable} observable 
     */
    noObservar(observable) {
        let indice = this.listaObservadores.findIndex(ob => observable.id == ob.id);
        if (indice >= 0){            
            this.listaObservadores.splice(indice, 1);
        }        
    }
}