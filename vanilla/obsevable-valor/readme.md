# Observable valor

El objetivo de esta clase es observar de manera sensilla cambios, sin necesidad de instalar rxjs.

## uso

```js
import {Observable} from 'observable-valor';


let num = new Observable(0);
```

puede usar con **unpkg**
```js
import {Observable} from 'https://unpkg.com/observable-valor';
```

### Atributos

`valor`

Contiene el último valor asignado al Observable.

```js
console.log(num.valor);
```

### Métodos

**ultimo():** `valor`
Regresa el ultimo valor asignado al observable.
```js
console.log(num.ultimo());
```
**observa(fun: `Function`):** `Observable`
Se subscribe a los cambios del observable.
```js
let ob = num.observa(val => {
    console.log('nuevo valor', val);
});
```
**noObservar(ob: `Observable`)** 
Se dessubscribe del observable.
```js
num.noObservar(ob);
```


### Ejemplo

```js
import {Observable} from 'observable-valor';

let num = new Observable(0);

num.observa(val => {
    console.log('observable 1', val);
});
let ob = num.observa(val => {
    console.log('observable 2', val);
});
num.observa(val => {
    console.log('observable 3', val);
});

//siguiente numero
num.sig(55);
//dessubscribimos el observable 2
num.noObservar(ob);

//siguiente numero
num.sig(100);

```