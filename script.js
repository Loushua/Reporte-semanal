// Variable global para guardar los datos una vez cargados
let datosOriginales = null; // --- NUEVO ---

// Esta función se ejecuta cuando la página ha cargado completamente.
document.addEventListener('DOMContentLoaded', function() {
    
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            datosOriginales = data; // --- NUEVO: Guardamos los datos originales
            llenarDatos(data.avanceTareas); // --- MODIFICADO: Pasamos solo las tareas
            llenarDatosGenerales(data); // --- NUEVO: Función separada para los datos generales
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // --- NUEVO: Escuchamos los clics en los botones de ordenar ---
    document.getElementById('ordenarPorAvance').addEventListener('click', () => {
        // Hacemos una copia para no modificar el array original
        const tareasOrdenadas = [...datosOriginales.avanceTareas].sort((a, b) => b.avance - a.avance);
        llenarDatos(tareasOrdenadas); // Volvemos a dibujar la tabla con los datos ordenados
    });

    document.getElementById('ordenarPorEstado').addEventListener('click', () => {
        const tareasOrdenadas = [...datosOriginales.avanceTareas].sort((a, b) => a.estado.localeCompare(b.estado));
        llenarDatos(tareasOrdenadas);
    });
});

// --- NUEVO: Función para rellenar solo los datos de arriba y los comentarios ---
function llenarDatosGenerales(data) {
    document.getElementById('codigoUnico').textContent = data.codigoUnico;
    document.getElementById('nombreProyecto').textContent = data.nombreProyecto;
    document.getElementById('montoInversion').textContent = data.montoInversion;
    document.getElementById('fechaReporte').textContent = data.fechaReporte;
    document.getElementById('comentarios').textContent = data.comentarios;
}


// --- MODIFICADO: Ahora esta función se enfoca solo en la tabla ---
function llenarDatos(tareas) {
    const tablaBody = document.getElementById('tablaAvance');
    tablaBody.innerHTML = ''; 

    tareas.forEach(item => {
        const fila = document.createElement('tr');
        
        // --- NUEVO: Lógica para colorear las filas ---
        // 1. Convertimos el estado a un formato simple para la clase CSS
        const claseEstado = 'estado-' + item.estado.toLowerCase().replace(' ', '-'); // ej: "En Progreso" -> "estado-en-progreso"
        
        // 2. Añadimos esa clase a la fila
        fila.classList.add(claseEstado);

        fila.innerHTML = `
            <td>${item.tarea}</td>
            <td>${item.responsable}</td>
            <td>${item.estado}</td>
            <td>${item.avance}%</td>
        `;
        
        tablaBody.appendChild(fila);
    });
}