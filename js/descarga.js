function updateAllData() {
    cargarInfoDescarga(69, 'lote1', 'variedad1', 'agricultor1', 'proveedor1', 'matricula1');
    cargarInfoDescarga(70, 'lote2', 'variedad2', 'agricultor2', 'proveedor2', 'matricula2');
    cargarInfoDescarga(71, 'lote3', 'variedad3', 'agricultor3', 'proveedor3', 'matricula3');
    cargarInfoDescarga(72, 'lote4', 'variedad4', 'agricultor4', 'proveedor4', 'matricula4');
    linea4Active = cambiarEstadoMaquina(69, 'status-linea4');
    linea3Active = cambiarEstadoMaquina(70, 'status-linea3');
    linea2Active = cambiarEstadoMaquina(71, 'status-linea2');
    linea1Active = cambiarEstadoMaquina(72, 'status-linea1');
    cargarOperario(69, 'op1');
    cargarOperario(70, 'op2');
    cargarOperario(71, 'op3');
    cargarOperario(72, 'op4');
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllData();
});

const backendUrl = 'http://127.0.0.1:5000';

async function cargarInfoDescarga(id_maquina, id_lote, id_variedad, id_agricultor, id_proveedor, id_matricula) {

    try {
        const response = await fetch(`${backendUrl}/api/info_descarga/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Datos de descarga cargados:', data);

            // Actualizar los campos de entrada con los datos recibidos
            document.getElementById(id_lote).value = data.lote || '';
            document.getElementById(id_variedad).value = data.variante || '';
            document.getElementById(id_agricultor).value = data.agricultor || '';
            document.getElementById(id_proveedor).value = data.proveedor || '';
            document.getElementById(id_matricula).value = data.matricula || '';
        } else {
            console.error(`Error al cargar los datos de descarga de la máquina ${id_maquina}:`, response.status);
            // Puedes manejar el error estableciendo valores por defecto o mostrando un mensaje al usuario
            document.getElementById(id_lote).value = 'Error';
            document.getElementById(id_variedad).value = 'Error';
            document.getElementById(id_agricultor).value = 'Error';
            document.getElementById(id_proveedor).value = 'Error';
            document.getElementById(id_matricula).value = 'Error';
        }
    } catch (error) {
        console.error(`Error al cargar los datos de descarga de la máquina ${id_maquina}:`, error);
        // Puedes manejar el error estableciendo valores por defecto o mostrando un mensaje al usuario
        document.getElementById(id_lote).value = 'Error';
        document.getElementById(id_variedad).value = 'Error';
        document.getElementById(id_agricultor).value = 'Error';
        document.getElementById(id_proveedor).value = 'Error';
        document.getElementById(id_matricula).value = 'Error';
    }
}

async function cargarOperario(id_maquina, id_operario) {

    try {
        const response = await fetch(`${backendUrl}/api/operarios/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Dato cargado:', data);
            document.getElementById(id_operario).value = (data.operarios ? data.operarios.join(', ') : '').toUpperCase();
        }
    } catch (error) {
        console.error('Error al cargar el dato:', error);
        document.getElementById(id_operario).value = 'Error';
    }
}