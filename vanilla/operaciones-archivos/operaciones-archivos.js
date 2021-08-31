/**
 * Descarga un archivo
 * @param {any} data Es un stream de datos, puede ser texto o hexadecimal.
 * @param {string} nombreArchivo Nombre del archivo
 * @param {string} type Define el content-type del archivo descargado
 */
export function descargarArchivo(data, nombreArchivo, type) {
    var blob = new Blob([data], { type: type });
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = nombreArchivo;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
/**
 * Crea stream de base 64 del blob dado
 * @param {Blob} blob Puede ser tambien un File
 */
export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        if (!(blob instanceof Blob)) {
            reject(new Error('No es un blob el dato introducido'));
        }
        let reader = new FileReader();
        reader.onload = function (data) {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}
/**
 * Lee un archivo de texto de una ruta dada.
 * @param {string} url 
 */
export function getArchivoTexto(url) {
    return fetch(url).then(response => response.text());
}
/**
 * Descarga cualquier blob o File de la aplicacion.
 * @param {Blob} blob 
 * @param {string} filename  Descarga cualquier blob
 */
export function descargarBlob(blob, nombreArchivo) {
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = nombreArchivo;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}