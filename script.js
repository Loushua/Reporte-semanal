// Esta función se ejecuta cuando la página ha cargado completamente.
document.addEventListener('DOMContentLoaded', function() {
    
    // Usamos 'fetch' para leer nuestro archivo de datos JSON.
    fetch('datos.json')
        .then(response => response.json()) // Convertimos la respuesta a un formato que JS entiende.
        .then(data => {
            // Una vez que tenemos los datos, llamamos a la función para rellenar la página.
            llenarDatos(data);
        })
        .catch(error => console.error('Error al cargar los datos:', error)); // Si hay un error, lo muestra en la consola.

});

function llenarDatos(data) {
    // ---- 1. Rellenamos los datos generales ----
    // Buscamos el elemento por su 'id' y le ponemos el texto del archivo JSON.
    document.getElementById('codigoUnico').textContent = data.codigoUnico;
    document.getElementById('nombreProyecto').textContent = data.nombreProyecto;
    document.getElementById('montoInversion').textContent = data.montoInversion;
    document.getElementById('fechaReporte').textContent = data.fechaReporte;
    document.getElementById('comentarios').textContent = data.comentarios;

    // ---- 2. Rellenamos la tabla de avance ----
    const tablaBody = document.getElementById('tablaAvance');
    
    // Limpiamos la tabla por si tuviera contenido previo.
    tablaBody.innerHTML = ''; 

    // Recorremos cada tarea en nuestra lista de 'avanceTareas' del archivo JSON.
    data.avanceTareas.forEach(item => {
        // Por cada tarea, creamos una nueva fila <tr>
        const fila = document.createElement('tr');

        // Creamos las celdas <td> y las añadimos a la fila.
        fila.innerHTML = `
            <td>${item.tarea}</td>
            <td>${item.responsable}</td>
            <td>${item.estado}</td>
            <td>${item.avance}%</td>
        `;
        
        // Añadimos la fila completa al cuerpo de la tabla.
        tablaBody.appendChild(fila);
    });
}