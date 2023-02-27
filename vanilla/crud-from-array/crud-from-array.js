"use strict";
exports.__esModule = true;
exports.CrudFromArray = void 0;
var CrudFromArray = /** @class */ (function () {
    function CrudFromArray(lista, key) {
        if (lista === void 0) { lista = []; }
        if (key === void 0) { key = 'id'; }
        this.lista = [];
        this.lista = lista;
        this.key = key;
    }
    CrudFromArray.prototype.get = function (id) {
        var _this = this;
        return this.lista.find(function (item) { return item[_this.key] === id; });
    };
    CrudFromArray.prototype.update = function (id, item) {
        var objArr = this.get(id);
        if (objArr)
            Object.assign(objArr, item);
        return false;
    };
    CrudFromArray.prototype.list = function (offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 10; }
        return this.lista.slice(offset, offset + limit);
    };
    CrudFromArray.prototype.post = function (item) {
        return this.lista.push(item);
    };
    CrudFromArray.prototype["delete"] = function (id) {
        var _this = this;
        var index = this.lista.findIndex(function (item) { return item[_this.key] === id; });
        if (index >= 0)
            return this.lista.splice(index, 1);
        return false;
    };
    return CrudFromArray;
}());
exports.CrudFromArray = CrudFromArray;
