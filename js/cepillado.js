function updateAllData() {
    linea3Active = cambiarEstadoMaquina(76, 'status-linea3');
    linea2Active = cambiarEstadoMaquina(75, 'status-linea2');
    linea1Active = cambiarEstadoMaquina(74, 'status-linea1');
    cargarParametros(76); // LINEA 3
    cargarParametros(75); // LINEA 2
    cargarParametros(74); // LINEA 1
    cargar_operarios(76, 'carr3'); 
    cargar_operarios(75, 'carr2'); 
    cargar_operarios(74, 'carr1');
    cargarCepilladora(76); 
    cargarCepilladora(75); 
    cargarCepilladora(74);
    cargarLavadora(76); 
    cargarLavadora(75); 
    cargarLavadora(74);
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllData();
});

const backendUrl = 'http://127.0.0.1:5000';

async function cargarParametros(id_maquina) {

    try {
        const response = await fetch(`${backendUrl}/api/parametros_maquina/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Parámetros de la máquina ${id_maquina} cargados:`, data);

            // Actualizar los campos de entrada con los datos recibidos
            switch (id_maquina) {
                case 76: // LINEA 3
                    document.getElementById('buenas3').value = data.buenas || '';
                    document.getElementById('malas3').value = data.malas || '';
                    document.getElementById('estado3').value = data.estado || '';
                    document.getElementById('numof3').value = data.of || '';
                    break;
                case 75: // LINEA 2
                    document.getElementById('buenas2').value = data.buenas || '';
                    document.getElementById('malas2').value = data.malas || '';
                    document.getElementById('estado2').value = data.estado || '';
                    document.getElementById('numof2').value = data.of || '';
                    break;
                case 74: // LINEA 1
                    document.getElementById('buenas1').value = data.buenas || '';
                    document.getElementById('malas1').value = data.malas || '';
                    document.getElementById('estado1').value = data.estado || '';
                    document.getElementById('numof1').value = data.of || '';
                    break;
            }
        } else {
            console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, response.status);
        }
    } catch (error) {
        console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, error);
    }
}

async function cargar_operarios(id_maquina, id_operario) {

    try {

        const response = await fetch(`${backendUrl}/api/operarios/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Operarios de la máquina ${id_maquina} cargados:`, data);
            document.getElementById(id_operario).value = (data.operarios ? data.operarios.join(', ') : '').toUpperCase();
        } 
    } catch (error) {
        console.error(`Error al cargar los parámetros de lavado de la máquina ${id_maquina}:`, error);
    }
}

async function cargarCepilladora(id_maquina) {

    try {
        const response = await fetch(`${backendUrl}/api/info_puesto_lavado/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Pasa por la cepilladora:`, data);
            switch (id_maquina) {
                case 76: // LINEA 3
                    if(data.cepilladora === 'true'){
                        const cep3 = document.getElementById('cep3');
                        cep3.checked = true;
                    }else{
                        const cep3 = document.getElementById('cep3');
                        cep3.checked = false;
                    }
                    break;
                case 75: // LINEA 2
                    if(data.cepilladora === 'true'){
                        const cep2 = document.getElementById('cep2');
                        cep2.checked = true;
                    }else{
                        const cep2 = document.getElementById('cep2');
                        cep2.checked = false;
                        cep2.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 74: // LINEA 1
                    if(data.cepilladora === 'true'){
                        const cep2 = document.getElementById('cep1');
                        cep2.checked = true;
                    }else{
                        const cep2 = document.getElementById('cep1');
                        cep2.checked = false;
                        cep2.parentElement.style.backgroundColor = '';
                    }
            }
        } else {
            console.error(`Error al cargar info de la máquina ${id_maquina}:`, response.status);
        }

    } catch (error) {
        console.error(`Error al cargar info de la máquina ${id_maquina}:`, error);
    }
}

async function cargarLavadora(id_maquina) {

    try {
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Estado lavadora:`, data);
            switch (id_maquina) {
                case 76: // LINEA 3
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep3 = document.getElementById('lavado3');
                        cep3.checked = true;
                    }else{
                        const cep3 = document.getElementById('lavado3');
                        cep3.checked = false;
                    }
                    break;
                case 75: // LINEA 2
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep2 = document.getElementById('lavado2');
                        cep2.checked = true;
                    }else{
                        const cep2 = document.getElementById('lavado2');
                        cep2.checked = false;
                        cep2.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 74: // LINEA 1
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep2 = document.getElementById('lavado1');
                        cep2.checked = true;
                    }else{
                        const cep2 = document.getElementById('lavado1');
                        cep2.checked = false;
                        cep2.parentElement.style.backgroundColor = '';
                    }
            }
        } else {
            console.error(`Error al cargar info de la máquina ${id_maquina}:`, response.status);
        }

    } catch (error) {
        console.error(`Error al cargar info de la máquina ${id_maquina}:`, error);
    }
}

