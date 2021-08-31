# Operaciones de archivos

El proposito de esta libreria es 
- Obtener archivos de texto de urls
- Descargar blobs y texto.
- Convertir blobs a base64.

## Obtener archivo de texto

Definición de la función
```js
function getArchivoTexto(<string> url): Promise<string>
```

Donde

| Parametro | Tipo   | Descripción    |
|-----------|--------|----------------|
| url       | string | Url del archivo|

Uso
```js
import { getArchivoTexto } from "operaciones-archivos";

getArchivoTexto('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js')
.then(archivo => {
    console.log(archivo);
});
```

## Descargar blob

Definición de la función
```js
function descargarBlob(<Blob> blob,<string> nombreArchivo)
```

Donde

| Parametro    | Tipo   | Descripción       |
|--------------|--------|-------------------|
| blob         | Blob   | Blob a descargar  |
| nombreArchivo| string | Nombre del archivo|

Uso
```js
import { descargarBlob } from "operaciones-archivos";

fetch('https://picsum.photos/200/300.jpg')
.then(data => data.blob())
.then(data => {
    descargarBlob(blob, 'imagenRandom.jpg');
});

```

## Descargar texto

Definición de la función
```js
function descargarArchivo(<string> data,<string> nombreArchivo,<string> type)
```

Donde

| Parametro    | Tipo   | Descripción         |
|--------------|--------|---------------------|
| data         | string | texto a descargar   |
| nombreArchivo| string | Nombre del archivo  |
| type         | string | Mimetype del archivo|

Uso
```js
import { descargarArchivo } from "operaciones-archivos";

let texto = "console.log('Hola mundo');";
descargarArchivo(texto, 'hola.js', 'application/javascript');
```

## blob to base64

Definición de la función
```js
function blobToBase64(<Blob> blob)
```

Donde

| Parametro    | Tipo   | Descripción         |
|--------------|--------|---------------------|
| blob         | Blob   | Blob a convertir    |


Uso
```js
import { blobToBase64 } from "operaciones-archivos";

fetch('https://picsum.photos/200/300.jpg')
.then(data => data.blob())
.then(data => {
    blobToBase64(data).then(base64 => console.log(base64));        
});
```
