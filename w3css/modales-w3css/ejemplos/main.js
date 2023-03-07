import { ModalAceptar } from '../modal-aceptar.js';
import {Modal} from './../modal.js';



let modal = new Modal();
let modalAceptar = new ModalAceptar();

modalAceptar.titulo = 'Modal aceptar'; 

modal.titulo = 'Configuraciones';

modal.innerHtml = /*html*/`
<form class="w3-container">
    <div class="w3-margin-bottom">
    <label for="tema"><b>Tema:</b></label>
    <select class="w3-select" name="tema">
    <option value="claro" selected>Claro</option>
    <option value="oscuro">Oscuro</option>
    </select>
    </div>
    <div>
    <label for="tema"><b>Validar código Javascript:<b></label>
    <select class="w3-select" name="validarJs">
    <option value="true" selected>SI</option>
    <option value="false">No</option>
    </select>
    </div>
</form>
`;
modal.open().then(data => {
    console.log(data);
    modalAceptar.open();
});
