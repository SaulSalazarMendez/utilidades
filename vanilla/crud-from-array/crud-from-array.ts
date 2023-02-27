export class CrudFromArray <_T>{
    public lista: _T[] = [];
    public key: any;
    constructor(lista: _T[] = [], key: any = 'id'){
        this.lista = lista;
        this.key = key;
    }

    
    get(id: any) {
        return this.lista.find(item => item[this.key] === id);
    }
    
    update(id: any, item: _T) {
        let objArr = this.get(id);
        if (objArr)  Object.assign(objArr, item);
        return false;
    }

    list(offset: number = 0, limit:number = 10) {
        return this.lista.slice(offset, offset + limit);
    }

    post(item:_T) {
        return this.lista.push(item);
    }

    delete(id:any) {
        const index = this.lista.findIndex(item => item[this.key] === id);
        if (index >= 0) return this.lista.splice(index, 1);
        return false;
    }
}
