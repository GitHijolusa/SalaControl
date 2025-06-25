function updateAllData() {
    linea4Active = cambiarEstadoMaquina(104, 'status-linea4');
    linea3Active = cambiarEstadoMaquina(103, 'status-linea3');
    linea2Active = cambiarEstadoMaquina(102, 'status-linea2');
    linea1Active = cambiarEstadoMaquina(101, 'status-linea1');
    matricula1 = obtenerInfoCamion(101, 'matricula1', 'cliente1', 'producto1', 'pal1', 'registro1', 'huecos1');
    matricula2 = obtenerInfoCamion(102, 'matricula2', 'cliente2', 'producto2', 'pal2', 'registro2', 'huecos2');
    matricula3 = obtenerInfoCamion(103, 'matricula3', 'cliente3', 'producto3', 'pal3', 'registro3', 'huecos3');
    matricula4 = obtenerInfoCamion(104, 'matricula4', 'cliente4', 'producto4', 'pal4', 'registro4', 'huecos4');
    cargarOperario(101, 'op1');
    cargarOperario(102, 'op2');
    cargarOperario(103, 'op3');
    cargarOperario(104, 'op4');
    cargarOperariosMant('limpieza')
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllData();
});

const backendUrl = 'http://127.0.0.1:5000';

async function obtenerInfoCamion(id_maquina, id_matricula, id_cliente, id_producto, id_pal, id_registro, id_huecos) {

    try {
        const response = await fetch(`${backendUrl}/api/carga/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Datos camion expediciones:', data);
            document.getElementById(id_matricula).value = data.matricula || '';
            document.getElementById(id_cliente).value = (data.cliente || '').toUpperCase();
            document.getElementById(id_producto).value = data.producto || '';
            document.getElementById(id_pal).value = data.paletizacion || '';
            document.getElementById(id_huecos).value = data.huecos || '';
            if (data.fecha) {
                const date = new Date(data.fecha);
                const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                document.getElementById(id_registro).value = formattedDate;
            } else {
                document.getElementById(id_registro).value = '';
            }
        } else {
            console.log(`Error al cargar los datos del camion ${id_maquina}`, response.status);
        }

    } catch (error) {
        console.error(`Error al cargar los datos del camion ${id_maquina}:`, error);
        return null;
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

async function cargarOperariosMant (id_operario) {

    try {
        const response = await fetch(`${backendUrl}/api/operarios_mantenimiento/`);

        if(response.ok) {
            const data = await response.json();
            console.log('Dato mant cargado:', data);
            document.getElementById(id_operario).value = data.dec_tipooperario || '';
        }
    } catch (error) {
        console.error('Error al cargar el dato:', error);
    }
}