(function () {
    //Variables
    let DB;

    //Variables documento
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const telefonoInput = document.querySelector("#telefono");
    const empresaInput = document.querySelector("#empresa");

    document.addEventListener('DOMContentLoaded',()=>{

        conectarDB();

        //Verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);

        const idCliente = parametrosURL.get('id');
        
        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        };
    });

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'],'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);  
                };
                cursor.continue();
            };
        };
    };

    function llenarFormulario(datosCliente) {
        const {nombre,email,telefono,empresa} = datosCliente

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    };

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