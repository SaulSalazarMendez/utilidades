# Crud From Array

Usamo una clase para hacer operaciones CRUD sobre un array.

Esto sirve para hacer mocks o pruebas en formularios.



## Setup


```js
import {CrudFromArray} from 'crud-from-array';

let arregloPersonas = [
    {id: 1, nombre: 'Juan'},
    {id: 2, nombre: 'Pablo'},
    {id: 3, nombre: 'Leo'},
    {id: 4, nombre: 'Mariana'},
    {id: 5, nombre: 'Daniela'},
    {id: 6, nombre: 'Jesus'},
    {id: 7, nombre: 'María'},
    {id: 8, nombre: 'Luis'},
    {id: 9, nombre: 'José'},
    {id: 10, nombre: 'Fabi'},
];

let persona =  new CrudFromArray(arregloPersonas, 'id');

```
## cdn

Uso con unpkg:
```js
import {CrudFromArray} from 'https://unpkg.com/crud-from-array';
```

## Crear datos (post)

Para agregar datos a una tabla necesitamos hacer un post:
```js
persona.post({nombre: 'jj', id: 11});
```

notar: Que al ser un arreglo que manejamos, se tiene que dar los ids manualmente


## Leer datos

Contamos con dos opciones: get and list.

### Get 


```js
//obtenemos la persona con id = 2
persona.get(2);
```

### List
Regresa la lista de todos los items del array

```js
//regresa los primeros 10 registros del array
persona.list()


//regresa un sub array con 5 elementos inicializando desde la posicion 4
const offset = 4;
const limit = 5; 
persona.list(offset, limit);
```


## Actualizar datos

Para actualizar los registro del array usamos

```js
//actualizamos el item con id 1 con el objecto {nombre: 'coque'}
persona.update(1, {nombre: 'coque'});
```
 
## Delete

Eliminamos el elemnto del array con id dado
```js
//eliminamos el item con id = 2
persona.delete(2);
```

