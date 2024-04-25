// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SEE_MODAL = new bootstrap.Modal('#seeModal'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');


// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('Nombres'),
    DESCRIPCION_PRODUCTO = document.getElementById('Apellidos'),
    CANTIDAD_PRODUCTO = document.getElementById('Dui'),
    PRECIO_PRODUCTO = document.getElementById('Cargo'),
    CATEGORIA_PRODUCTO = document.getElementById('Email'),
    TELEFONO_Usuario = document.getElementById('Telefono'),
    IMAGEN_PRODUCTO = document.getElementById('imagen');



/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear Usuario';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelected(lista_datos_categorias, 'readAll', 'categoria');
}

/*
* Función asíncrona para preparar el formulario al momento de actualizar un registro.
* Parámetros: id (identificador del registro seleccionado).
* Retorno: ninguno.
*/
const openUpdate = () => {
    // Se muestra la caja de diálogo con su título.
    SEE_MODAL.hide();
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Actualizar el Usuario';
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea cancelar el registro de datos?');
    console.log('Resultado de la confirmación:', RESPONSE);
    if (RESPONSE === true) {
        SEE_MODAL.hide();
    }
}

const openInfo = () => {
    // Se muestra la caja de diálogo con su título.
    SEE_MODAL.show();
    MODAL_TITLE2.textContent = 'Información del usuario';
}

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillCards();
});


const lista_datos = [
    {
        imagen: 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png',
        Dui: '12345678-9',
        Nombre: 'Juan Torres',
        cargo: 'Empleado',
        Email: 'Juan@gmail.com'
    }, {
        imagen: 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png',
        Dui: '12345678-9',
        Nombre: 'Juan Torres',
        cargo: 'Empleado',
        Email: 'Juan@gmail.com'
    }, {
        imagen: 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png',
        Dui: '12345678-9',
        Nombre: 'Juan Torres',
        cargo: 'Empleado',
        Email: 'Juan@gmail.com'
    }, {
        imagen: 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png',
        Dui: '12345678-9',
        Nombre: 'Juan Torres',
        cargo: 'Empleado',
        Email: 'Juan@gmail.com'
    }
];

/*
* Función asíncrona para llenar las cartas con los registros disponibles.
* Parámetros: form (formulario de búsqueda).
* Retorno: ninguno.
*/
async function fillCards(form = null) {
    const cargarCartas = document.getElementById('cards');
    // Mostrar materiales de respaldo
    lista_datos.forEach(row => {
        const cardsHtml = `
        <div class="col-md-5 col-sm-12">
                    <div class="tarjetas shadow d-flex align-items-center">
                        <!-- Imagen a la izquierda -->
                        <div class="col-6 bg-white tarjetas">
                            <img class="img-fluid imagen"
                                src="${row.imagen}"
                                alt="...">
                        </div>
                        <!-- Textos a la derecha -->
                        <div class="col-6">
                            <p>Dui: <span>${row.Dui}</span></p>
                            <p>Nombre: <span>${row.Nombre}</span></p>
                            <p>Cargo: <span>${row.cargo}</span></p>
                            <p>Email: <span>${row.Email}</span></p>
                            <button class="btn botones azul rounded-5" onclick="openInfo()">Ver mas...</button>
                        </div>
                    </div>
                </div>
        `;
        cargarCartas.innerHTML += cardsHtml;
    })
}
