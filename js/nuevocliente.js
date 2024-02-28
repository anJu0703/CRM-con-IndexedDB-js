(function () {
    //Variables
    let DB;

    //Variables del documento
    const formulario = document.querySelector('#formulario');

    //addEventListeners
    document.addEventListener('DOMContentLoaded',()=>{

        //Conectar a BD
        conectarDB();

        //Formulario
        formulario.addEventListener('submit', validarCliente);
    });

    //Funciones




    //Validar formulario
    function validarCliente(e) {
        e.preventDefault();

        //Leer inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios','error');
            return;
        }

        //Crear un objeto con la informacion
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        };

        crearNuevoCliente(cliente);
    };

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'],'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error','error');
        };

        transaction.oncomplete = function () {
            
            imprimirAlerta('El cliente se agrego correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';    
            }, 3000);
        };
    };

    //Conectar a BD
    function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm',1);

    //Mensaje de error
    abrirConexion.onerror = function () {
        console.log('Hubo un error');  
    };

    //Funcion si la BD ya esta creada
    abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;  
    };
};
       
})();