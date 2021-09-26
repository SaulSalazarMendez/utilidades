import {CrudIndexeddb} from '../crud-indexeddb.js';

function onError(e) {
console.log(e);
}

const tablas = {
    personas: {
        id: 'id'
    }
};

/**
 * Version de indexedDb, se cambia con cada cambio de las tablas.
 */
const version = 1;

let db = new CrudIndexeddb();

await db.init('test', version, tablas);


Vue.component('my-table', {
    data: () => {
        return {
            db: db,
            person: {
                lastName: '',
                name: ''
            },
            persons: []
        }
    },
    methods: {
        addPerson(person) {
            let obj = this;
            this.db.post('personas', person).then(response => {
                obj.loadPersons();
            });
            this.person ={
                lastName: '',
                name: ''
            };
        },
        loadPersons() {
            let obj = this;
            this.db.list('personas').then(lista => {
                obj.persons = lista;
            });
        },
        deletePerson(id) {
            let obj = this;
            this.db.delete('personas', id).then(response => {
                obj.loadPersons();
            });
        }
    },
    mounted: function(){
        let obj = this;
        setTimeout(tik => {        
            db.list('personas').then(response => {
                obj.persons = response
            });
        }, 100);
    },
    template: `
    <div>

    <div class="row">
    <div class="col s12 m12">
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
        <span class="card-title">Indexedb</span>
        <p>Indexeddb es una herramienta para persistir información dentro del explorador, lo que permite trabajar con nuestras aplicaciones web tanto en linea como en offline.</p>          
        <span class="card-title">Caracteristicas de indexedDb</span>
        <ul>
        <li>Es un estandar de la W3E</li>
        <li>Almacenar grandes volumenes de información, esta limitado por el espacio del disco del cliente</li>
        <li>Es una base de datos no-sql(no relacional)</li>
        <li>Puede persistir la mayoria de los tipos de datos de js.</li>
        <li>Agrega seguridad entre las transaciones.</li>          
        </ul>
        </div>
    </div>
    </div>
</div>

    <div class="row">
        <h4>Ejemplo</h4>
        <p>Recarga el explorador despues de agregar datos</p>
        <div class="input-field col s6">
        <input id="first_name" type="text" v-model="person.name" class="validate">
        <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" v-model="person.lastName">
        <label for="last_name">Last Name</label>
        </div>
    </div>
    <div style  ="text-align: right;">
    <button class="waves-effect waves-light btn" v-on:click="addPerson(person)">Add</button>
    </div>    
    <table>
    <tr>
        <th>id</th>
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Actions</th>
    </tr>
    <tr v-for="person in persons">
        <td>{{person.id}}</td>
        <td>{{person.name}}</td> 
        <td>{{person.lastName}}</td>
        <td> <button class="waves-effect waves-light btn" v-on:click="deletePerson(person.id)">-</button> </td>
    </tr>
    </table>
    </div>`
});
var app = new Vue({
    el: '#app',    
    mounted: () => {
        console.log(this);
    },    
});
