// La URL de tu servidor Flask
const SOCKET_IO_SERVER_URL = 'http://127.0.0.1:5000'; // Asegúrate de que esta URL sea accesible

const socket = io(SOCKET_IO_SERVER_URL);

socket.on('connect', () => {
    console.log('Conectado al servidor WebSocket desde la página.');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor WebSocket desde la página.');
});

// Este es el evento que el servidor envía para indicar una actualización
socket.on('update_data_signal', (data) => {
    console.log('Señal de actualización recibida del servidor:', data.message);
    // Llama a la función de actualización específica de la página actual
    // Esta función debe estar definida en el script JS de cada página (ej. lavado.js)
    if (typeof updateAllData === 'function') { // Verifica si la función existe en el scope global
        updateAllData();
    } else {
        console.warn("La función 'updateAllData' no está definida en esta página.");
    }
    // Opcional: Reiniciar el contador de "última actualización"
    if (typeof lastRefreshTime !== 'undefined') {
        lastRefreshTime = new Date();
    }
});

// Funciones comunes a todas las páginas (fecha/hora)
let lastRefreshTime = new Date(); // Asegúrate de que esté definida globalmente

function updateDateTime() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('es-ES', optionsDate);
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = now.toLocaleTimeString('es-ES', optionsTime);

    const currentDateElement = document.getElementById('current-date');
    const currentTimeElement = document.getElementById('current-time');

    if (currentDateElement) currentDateElement.textContent = formattedDate;
    if (currentTimeElement) currentTimeElement.textContent = formattedTime;
}

function updateLastRefresh() {
    const now = new Date();
    const diffInSeconds = Math.round((now - lastRefreshTime) / 1000);
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) lastUpdateElement.textContent = `Última actualización: hace ${diffInSeconds} segundos`;
}

async function cambiarEstadoMaquina(id_maquina, id_status) {

    try {
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log(`Estado de la máquina ${id_maquina} cargado`);

            const statusCircle = document.getElementById(id_status);
            if (statusCircle) {
                if (data.descparo == '0' || data.descparo == '' || data.descparo == '--') {
                    statusCircle.style.backgroundColor = '#00FF00';
                    console.log('activa')
                } else if (data.descparo === "BOCADILLO") {
                    statusCircle.style.backgroundColor = 'darkblue';
                } else {
                    statusCircle.style.backgroundColor = 'red';
                }
            }
        } else {
            console.error(`Error al cargar el estado de la máquina ${id_maquina}:`, response.status);
            const statusCircle = document.getElementById(id_status);
            if (statusCircle) statusCircle.style.backgroundColor = 'red';
        }
    } catch (error) {
        console.error(`Error al cargar el estado de la máquina ${id_maquina}:`, error);
        const statusCircle = document.getElementById(id_status);
        if (statusCircle) statusCircle.style.backgroundColor = 'red';
    }
}

function setIndicatorStyle(inputElementId, labelElementId, value, options = {}) {
    const defaultOptions = {
        unit: ''
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const inputElement = document.getElementById(inputElementId);
    const labelElement = document.getElementById(labelElementId);

    if (!inputElement || !labelElement) {
        console.error(`Elementos no encontrados: Input ID '${inputElementId}', Label ID '${labelElementId}'.`);
        return;
    }

    const numericValue = parseFloat(value);

    // Limpiar estilos del input (si se habían aplicado previamente)
    inputElement.style.borderColor = ''; 
    inputElement.style.backgroundColor = '';
    inputElement.style.color = 'black'; 

    // Limpiar clases y estilos anteriores del label
    labelElement.classList.remove('background-verde', 'background-naranja', 'background-rojo'); 
    labelElement.style.backgroundColor = '';
    labelElement.style.color = 'black'; 
    labelElement.style.border = ''; 
    labelElement.style.borderColor = '';
    labelElement.style.borderStyle = '';
    labelElement.style.borderWidth = '';


    if (isNaN(numericValue)) {
        inputElement.value = 'N/A';
        labelElement.style.backgroundColor = 'gray';
        labelElement.style.color = 'black';
        labelElement.style.border = '2px solid black'; 
        console.warn(`El valor para ${inputElementId} no es un número: ${value}`);
        return;
    }

    // Actualizar el valor del input
    inputElement.value = numericValue.toFixed(2) + mergedOptions.unit;


    // Determinar el color de fondo del label
    let backgroundColor = 'black';

    if (numericValue >= 90) {
        backgroundColor = '#00FF00';
        labelElement.classList.add('background-verde');
    } else if (numericValue >= 50) {
        backgroundColor = 'yellow';
        labelElement.classList.add('background-naranja');
    } else {
        backgroundColor = 'red';
        labelElement.classList.add('background-rojo');
    }

    // Aplicar el color de fondo al label
    labelElement.style.backgroundColor = backgroundColor;
    labelElement.style.color = 'black'; 
    labelElement.style.border = '2px solid black'; 
    labelElement.style.padding = '2px 5px'; 
    labelElement.style.display = 'inline-block';
    labelElement.style.borderRadius = '3px';
}

// Iniciar actualizaciones de fecha/hora locales
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateDateTime, 1000);
    setInterval(updateLastRefresh, 1000);
});