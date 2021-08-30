# Notificacion

Utilidad para mostrar notificaciones en el explorador.
Utilizamos w3css para mostrar notificaciones. 


Caracteristicas:

- Son tres tipos de notificaciones(success, warning, alert)
- Se encapsula su funcionamiento con shadowRoot
- Responsivas

## Uso


```js
addNotificacion(<opciones> opciones?);
```
| Opcion         | tipo   | Default                                    | Description                                       |
| -------------- | ------ | ------------------------------------------ | ------------------------------------------------- |
| `tipo`         | string | NOTIFICACION.success                       | Indica el color con el se muestra la notificación |
| `titulo`       | string | `Título`                                   | El título de la notificación                      |
| `mensaje`      | string | `Mensaje`                                  | El mensaje de la notificación                     |
| `tiempo`       | number | 5000                                       | El tiempo que durara la notificación              |
| `w3css`        | string | `https://www.w3schools.com/w3css/4/w3.css` | Indica la ubicacion del css w3.css                |



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

Se utiliza paraindicar cuanto dura la notificación. 

```js
addNotificacion({
    titulo: 'Aviso'
});
```

#### w3css

Se utiliza paraindicar cuanto dura la notificación. 

```js
//supongamos que descargamos la libreria y la tenemos en la carpeta css
addNotificacion({
    w3css: './css/w3.css'
});
```

## Ejemplo


```js
import { addNotificacion} from "@ssm/notificaciones-w3css";

addNotificacion({
    tipo: 'w3-indigo',
    titulo: '&#10004; Terminado',
    mensaje: 'Se termino la tarea correctamente.',
    tiempo: 2000
});
```