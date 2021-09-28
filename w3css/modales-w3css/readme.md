# Modales w3css

Utilidad para mostrar modales en el explorador.
Utilizamos w3css para mostrar la modal.

## Modal

Se utiliza solo para informar.

### Uso

```js
import {Modal} from 'modales-w3css';

let modal = new Modal();

modal.innerHtml = `<h1>Hola mundo</h1>`;
modal.open();
```

**Nota:** Si solo va usar la modal importe directamente desde su archivo
```ts
import {Modal} from 'modales-w3css/modal';
```

### Atributos

**innerHtml**: `string` 
Se usa para definir el contenido de la modal se utiliza la propiedad innerHtml.

```js
modal.innerHtml = `
<div class="w3-panel w3-green">
  <h3>Success!</h3>
  <p>Green often indicates something successful or positive.</p>
</div> 
`;
```
**titulo**: `string`
Se usa para definir el título de la modal.
```js
modal.titulo = `Título de la modal`;
```
**opciones.aceptar**: `string`
Se usa para definir el texto del botón aceptar, por defecto `Aceptar`;
```js
modal.opciones.aceptar = `Sí`;
```
**opciones.cancelar**: `string`
Se usa para definir el texto del botón cancelar, por defecto `Cancelar`;
```js
modal.opciones.cancelar = `No`;
```
**opciones.hostw3css**: `string`
Se usa para definir el host de w3css, por defecto es `https://www.w3schools.com/w3css/4/w3.css`.
```js
modal.opciones.hostw3css = `css/w3.css`;
```
**opciones.colorActivo**: `string`
Se usa para definir el color activo de la modal, por defecto es `w3-blue`.
```js
modal.opciones.colorActivo = `w3-black`;
```
**opciones.colorCancelar**: `string`
Se usa para definir el color cancelar de la modal, por defecto es `w3-red`.
```js
modal.opciones.colorCancelar = `w3-black`;
```
**opciones.colorFondo**: `string`
Se usa para definir el color cancelar de la modal, por defecto es `w3-white`.
```js
modal.opciones.colorFondo = `w3-indigo`;
```
**opciones.borderRadius**: `string`
Se usa para definir el radio de los bordos, por defecto es `0`.
```js
modal.opciones.borderRadius = `0 0 10px 10px`;
```
**opciones.borderRadius**: `string`
Se usa para definir el radio de los bordos, por defecto es `0`.
```js
modal.opciones.borderRadius = `0 0 10px 10px`;
```
**opciones.ancho**: `string`
Se usa para definir el ancho de la modal, por defecto es  `50%`.
```js
modal.opciones.ancho = `300px`;
```
### Métodos
**open()**: `Promise`
Se usa para saber la respuesta de abrir la ventana, se utiliza la función open.

```js
modal.open().then(res => {
    //presiono el botón x de la modal
    if (res.op === 'cerrar') {
        console.log('modal cerrada');
    }
    if (res.op === 'cancelar') {
        console.log('modal cancelada');
    }
    if (res.op === 'aceptar') {
        console.log('modal aceptar');
    }
});
```

## Modal Aceptar

Es una modal que cuenta con el boton de cerrar y el boton de Aceptar. Extiende de la clase Modal por lo que todos los atributos y métodos son los mismos.

### Uso

```js
import {ModalAceptar} from 'modales-w3css';

let modal = new ModalAceptar();

modal.innerHtml = `<h1>modal cerrar</h1>`;
modal.open();
```

**Nota:** Si solo va usar la modal importe directamente desde su archivo
```ts
import {ModalAceptar} from 'modales-w3css/modal-aceptar';
```

## Modal cerrar

Es una modal que solo cuenta con el boton de cerrar. Extiende de la clase Modal.

### Uso

```js
import {ModalCerrar} from 'modales-w3css';

let modal = new ModalCerrar();

modal.innerHtml = `<h1>modal cerrar</h1>`;
modal.open();
```

**Nota:** Si solo va usar la modal importe directamente desde su archivo
```ts
import {ModalCerrar} from 'modales-w3css/modal-cerrar';
```