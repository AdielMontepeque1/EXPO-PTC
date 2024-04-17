
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    graficoPastelCategorias();
});


/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelCategorias = async () => {
/*
*   Lista de datos de ejemplo en caso de error al obtener los datos reales.
*/
    const datosEjemplo = [
        {
            productos: 'Producto 1',
            cantidades: 26
        },
        {
            productos: 'Producto 2',
            cantidades: 25
        },
        {
            productos: 'Producto 3',
            cantidades: 27
        }
    ];
        let productos = [];
        let cantidades = [];
        datosEjemplo.forEach(filter => {
            productos.push(filter.productos);
            cantidades.push(filter.cantidades);
        });
        // Si ocurre un error, se utilizan los datos de ejemplo definidos arriba.
        pieGraph('chart2', productos, cantidades, 'Productos almacenados');

}