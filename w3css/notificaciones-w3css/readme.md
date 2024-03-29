# Notificacion

Utilidad para mostrar notificaciones en el explorador.
Utilizamos w3css para mostrar notificaciones. 


Caracteristicas:

- Son tres tipos de notificaciones(success, warning, alert)
- Se encapsula su funcionamiento con shadowRoot
- Responsivas

[DEMO](https://saulsalazarmendez.github.io/ejemplos/try-coding/#N4IghgrgLg9gTiAXCAymAXwGwAQoLIgA0IUAllBJjEiACICmAtjNgHIxkBmpAxmD6RgA7egGciITvR4ALMEgCMANgDsADhUAWBWoCcABgBMmzcR4wAJqQDm1RAG0QAHhmGAfA2ZsOpbnwHCYtgA7gDMPKKiTgD0rm4AOkJOnPCM2DyYYJEAvPEgYQC05kJQYKQicHnY/GTCuSAAxHkJQolOAA4tTpkARvSYbgAq5JQwMb39XeXt0OmZOXmF09BVUACe7fT1UPQAHlBVQmCMW3lkFFRVAG5gmBCnIABkDQr6b6EA3NjDFzDNbdFOm1OthQWDEm0JjgMllRPVmnh6EJRGAAFb0cZgPoDNo7fZgOD0MBzWH1JZCGZQEKhAo9eAWeiVEDYUTrTAPQmiUgAL3oiCEgUOxweJ2RaPo/ySnQAEjBMtgxKUFaJsBAjth2nB7j0wDEgUlSIxrCy4Dx6jIoFB2qJENFAbxRBBGAA6doyDgwUTRQxvKqstbssmkCxQGSIbCvfQAUklMTxpUJYC6gK6+viUG6WP6JIWIGaw3aY2iUJa6acon60ipMNzhQr7J4B2ZRxO21Ihcl6bLMHatSE2BudwehWshKRzUdPB4YhiPb7CQOB1ai6cc8E/cH9zJNLW/SowWawQJQnK1lnvfXpZXa+EA9uW8WNMJFmat0ZGeiN6EV5i9aryf1DouhLYYmELTFsSmClZhrOFHwKZYm2wdZNnqIQnT6JlsBbB4yDAv5mU3B4AFY3n0WMUzaHpoFgftYO3WkoH7QoeiHApR3oNYEU9BMYmoy1hGTFI4EYNxsAkAABQ1CzgKk8gtK0bTtYIVOdMJRFkGA5VEZ1zEYaIwgiL1NAM0JdMiPIPgkaT4CpYBqgsCx2C4Xh+HXABfbBODgGA0nky1rVtaI1XaABraxdN86IBRc/x1zEApDIskAPkSYpWS81JsGybALBgHgnSRKBnQAR3uOA1hQStG3gAAKAByYTGHqgBKVLWg6iEhCa50wEcgBRK4ioAGVIVkkUZBrHR6RhyHqwhsFq+grha7KxOACEdiuV1CSGkoGE4SBMCgWq2s29kqSa2gwCVHKRGCbAADFUmu0paqas7lwu3KbuJHLgHc9r0yu37nWE/r+BkWraqIwhQs41bsnWzb0wsX77HhtYAF1srvIcgagdzPvTPqnJ8Pw3OEWqNv7MEyELcM0dKZ16ZgQhEjBZCRioRnQfOUZ2dp0FRRRdFeeZkXxUFzm8MYBmfuZ2WO2XImUaEInxKx9ygA)

## Changelog

Version 1.0.4
* Fix build con proyectos vite

## Uso


```js
addNotificacion(<opciones> opciones?);
```
| Opcion         | tipo   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| `tipo`         | string | Indica el color con el se muestra la notificación |
| `titulo`       | string | El título de la notificación                      |
| `mensaje`      | string | El mensaje de la notificación                     |
| `tiempo`       | number | El tiempo que durara la notificación              |
| `w3css`        | string | Indica la ubicacion del css w3.css                |



### opciones


#### Tipo

Se utiliza para indicar el color en que se mostrara los colores de las notificaciones. Por defecto tenemos en el objecto NOTIFICACIONEs definidos 3 valores. Pero tambien se pueden utilizar directamente los colores de [w3.css](https://www.w3schools.com/w3css/w3css_colors.asp). Por defecto es NOTIFICACION.success.

```js
addNotificacion({
    tipo: 'w3-indigo'
});
```

#### Titulo

Se utiliza para mostrar el título de la notificación. El texto que se usa es para ponerlo directamente en la notificación mediante un innerHTML. Por defecto tiene el valor 'Título'.

```js
addNotificacion({
    titulo: 'Aviso'
});
```

#### Mensaje

Se utiliza para mostrar el mensaje de la notificación. El texto que se usa es para ponerlo directamente en la notificación mediante un innerHTML. Por defecto tiene el valor 'Mesanje'.

```js
addNotificacion({
    mensaje: 'Este es un mensaje'
});
```

#### Tiempo

Se utiliza paraindicar cuanto dura la notificación. Se indica en milisegundos.

```js
addNotificacion({
    tiempo: 2000
});
```

#### w3css

Se utiliza paraindicar la ubicacion de la libreria de w3css, por defecto es: *https://www.w3schools.com/w3css/4/w3.css*

```js
//supongamos que descargamos la libreria y la tenemos en la carpeta css
addNotificacion({
    w3css: './css/w3.css'
});
```

## Notificaciones

Estan definidas en el objecto NOTIFICACION y son las siguientes:

| tipo     | Valor        |
|--------- |------------- |
| `SUCCESS`| `w3-green`   |
| `WARNING`| `w3-yellow`  |
| `ALERT`  | `w3-red `    |



## Ejemplo


```js
import { addNotificacion, NOTIFICACION} from "notificaciones-w3css";

addNotificacion({
    tipo: NOTIFICACION.SUCCESS,
    titulo: '&#10004; Terminado',
    mensaje: 'Se termino la tarea correctamente.',
    tiempo: 2000
});
addNotificacion({
    tipo: NOTIFICACION.WARNING,
    titulo: ' Cuidado',
    mensaje: 'No se puede realizar esto.',
    tiempo: 2000
});
addNotificacion({
    tipo: NOTIFICACION.ALERT,
    titulo: ' Falló',
    mensaje: 'El servidor no funciona<br> Favor de contactar al administrador.',
    tiempo: 2000
});
//Puede ocupar una de las clases de color de w3css en el tipo
addNotificacion({
    tipo: 'w3-indigo',
    titulo: '&#10004; Terminado',
    mensaje: 'Se termino la tarea correctamente.',
    tiempo: 2000
});

```