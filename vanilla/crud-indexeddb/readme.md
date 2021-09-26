# Crud Indexeddb

Usar indexeddb con operaciones CRUD.

## Install
```
npm -i crud-indexeddb
```


## Setup

Ejemplo de uso:

```js
import {CrudIndexeddb} from 'crud-indexeddb';

function onError(e) {
    console.log(e);
}

const tablas = {
    persona: {
        //id de la tabla
        id: 'id'
    }
};

/**
 * Version de indexedDb, se cambia con cada cambio de las tablas.
 */
const version = 1;

let db = new CrudIndexeddb('test', version, tablas, onError);

```
## cdn

Uso con skypack:
```js
import {CrudIndexeddb} from 'https://cdn.skypack.dev/crud-indexeddb';
```
Uso con unpkg:
```js
import {CrudIndexeddb} from 'https://unpkg.com/crud-indexeddb';
```

## Crear datos (post)

Para agregar datos a una tabla necesitamos hacer un post:
```ts
db.post(tabla: string, datos: Object, autoid: booblean): Promise<Object>;
```

donde:


| Opcion         | tipo    | Description                                                   |
| -------------- | ------  | -----------------------------------------                     |
| `tabla`        | string  | Nombre de la tabla                                            |
| `datos`        | Object  | Datos que se guardaran                                        |
| `autoid`       | boolean | Indica si se genera el id automaticamente, por defecto es true|

**Nota**:  Por defecto el id que se crea es un timestamp(Date.now).

Ejemplo guardar persona con auto id:
```js
db.post('persona',{nombre: 'Juan'}).then(response => {
    console.log('persona guardada', response);
}).catch(error => {
    console.log('ocurrio algo malo');
});
```

Crear persona con id personalizado
```js
db.post('table1',{nombre: 'Juan', id: 1}, false).then(response => {
    console.log('save something', response);
}).catch(error => {
    console.log('bad something happened');
});
```

## Leer datos

Contamos con dos opciones: get and list.

### Get 

Regresa un item que concuerda con el id dado.
```ts
db.get(tabla: string, id: any): Promise<Object>;
```
donde:
| Opcion         | tipo    | Description                              |
| -------------- | ------  | -----------------------------------------|
| `tabla`        | string  | Nombre de la tabla                       |
| `id`           | any     | Id que identificara al campo             |
Ejemplo
```js
db.get('persona', 142563652).then(response => {
    console.log('la persona', response);
}).catch(error => {
    console.log('no existe la persona');
});
```

### List
Regresa la lista de todos los items de la tabla
```ts
db.list(tabla: string): Promise<[Object]>;
```
donde:
| Opcion         | tipo    | Description                              |
| -------------- | ------  | -----------------------------------------|
| `tabla`        | string  | Nombre de la tabla                       |

```js
db.list('persona').then(response => {
    console.log('Todas las personas', response);
}).catch(error => {
    console.log('');
});
```

## Actualizar datos

Para actualizar los registro de la tabla usamos
```ts
db.put(tabla: string, datos: Object): Promise<Object>;
```
donde
| Opcion         | tipo    | Description                                                                         |
| -------------- | ------  | ------------------------------------------------------------------------------------|
| `tabla`        | string  | Nombre de la tabla                                                                  |
| `datos`        | Object    | Es un objecto que contiene los datos, debe incluir el id con el que se identifica.|

Nota: Si no existe el id, creara automaticamente el registro.
```js
db.put('persona',{id: 142563652, nombre: 'Juana'}).then(response => {
    console.log('persona actualizada', response);
});
```
 
## Delete

All items have a id, so when we delete a item use the id of item for delete it.
```ts
db.delete(tabla: string, id: any): Promise<Boolean>;
```
donde:
| Opcion         | tipo    | Description                              |
| -------------- | ------  | -----------------------------------------|
| `tabla`        | string  | Nombre de la tabla                       |
| `id`           | any     | Id que identificara al campo             |


```js
db.delete('persona', 142563652).then(response => {
    console.log('delete the item', response);
});
```


# Ejemplo

proximamente