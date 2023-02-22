export class CrudFromArray {
    constructor(lista = [], key = 'id'){
        this.lista = lista;
        this.key = key;
    }

    
    get(id) {
        return this.lista.find(item => item[this.key] === id);
    }
    
    update(id, item) {
        let objArr = this.get(id);
        if (objArr)  Object.assign(objArr, item);
        return false;
    }

    list(offset = 0, limit = 10) {
        return this.lista.slice(offset, offset + limit);
    }

    post(item) {
        return this.lista.push(item);
    }

    delete(id) {
        const index = this.lista.findIndex(item => item[this.key] === id);
        if (index >= 0) return this.lista.splice(index, 1);
        return false;
    }
}
