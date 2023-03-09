import { Campo, CampoCatalogo } from "../modelo.js";

/**
 * 
 * @param {Campo} campo 
 */
function getHelpText(campo) {
    if (campo.helptext) {
        return /*html*/`
        <div class="badge badge-info">${campo.helptext}</div>`
    }
    return '';
}
/**
 * 
 * @param {Campo} campo 
 */
function noVisible(campo) {
    if (campo.getReglas().indexOf('no-visible')>=0) {
        return 'no-visible';
    }
    return '';
}
/**
 * 
 * @param {CampoCatalogo} campo 
 */
function renderOptions(campo) {
    let options = '';    
    for(let opt of campo.lista) {
        let activo = '';
        if (opt.activo == 0) {
            activo = 'disabled';
        }
        options += `<option value="${opt.valor}" ${activo}>${opt.etiqueta}</option>`;        
    }
    return options;
}
/**
 * 
 * @param {CampoCatalogo} campo 
 */
function renderSelect(campo) {
    return `
    <select class="form-control" id="${campo.nombre}" name="${campo.nombre}" ${campo.getReglas()} entrada >
        ${renderOptions(campo)}
    </select>
    `;
}
function renderRadio(campo) {
    let radios = ``;
    for(let opt of campo.lista) {        
        let activo = '';
        if (opt.activo == 0) {
            activo = 'disabled';
        }
        radios += `
        <p>
        <input class="" type="radio" name="${campo.nombre}" value="${opt.valor}" ${activo} ${campo.getReglas()} entrada>
        <label>${opt.etiqueta}</label></p>
        `;
    }
    return radios;
}
/**
 * 
 * @param {CampoCatalogo} campo 
 */
function renderCampoCatalogo(campo){
    console.log(campo);
    if (campo.tipo == 'select'){
        return renderSelect(campo);
    }
    if (campo.tipo == 'radio'){
        return renderRadio(campo)
    }
    return '';
}
/**
 * 
 * @param {Campo} campo 
 */
function renderInput(campo) {
    if (campo.tipo == 'textarea') {
        return `<textarea rows="3" style="resize:none"  id="${campo.nombre}" name="${campo.nombre}" ${campo.getReglas()} entrada class="form-control"></textarea>`;
    }
    if (campo.constructor.name === 'CampoCatalogo') {
        return renderCampoCatalogo(campo);
    }
    return `<input type="${campo.tipo}" id="${campo.nombre}" name="${campo.nombre}" ${campo.getReglas()} entrada class="form-control" placeholder="${campo.placeholder}">`;
}
/**
 * 
 * @param {Campo} campo 
 */
export function renderBo(campo) {
    return /*html*/`
    <div class="col-sm-${campo.ancho}" ${noVisible(campo)}> 
    <div class="form-group">
        <label for="${campo.nombre}" class=""><b>${campo.etiqueta}</b></label>
        ${renderInput(campo)}
        ${getHelpText(campo)}
    </div>               
    </div>
    `;
}