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
    cambiarImagenMaquina(76, 'calibrador3');
    cambiarImagenMaquina(75, 'calibrador2');
    cambiarImagenMaquina(74, 'calibrador1');
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
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Pasa por la cepilladora:`, data);
            switch (id_maquina) {
                case 76: // LINEA 3
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep3 = document.getElementById('cep3');
                        cep3.checked = true;
                    }else{
                        const cep3 = document.getElementById('cep3');
                        cep3.checked = false;
                    }
                    break;
                case 75: // LINEA 2
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep2 = document.getElementById('cep2');
                        cep2.checked = true;
                    }else{
                        const cep2 = document.getElementById('cep2');
                        cep2.checked = false;
                        cep2.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 74: // LINEA 1
                    if(data.descparo === '0' || data.descparo === ''){
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
                    }else if(data.descparo === 'BOCADILLO'){
                        const cep3 = document.getElementById('lavado3');
                        cep3.style.backgroundColor = 'darkblue';
                    }else{
                        const cep3 = document.getElementById('lavado3');
                        cep3.checked = false;
                    }
                    break;
                case 75: // LINEA 2
                    if(data.descparo === '0' || data.descparo === ''){
                        const cep2 = document.getElementById('lavado2');
                        cep2.checked = true;
                    }else if(data.descparo === 'BOCADILLO'){
                        const cep3 = document.getElementById('lavado2');
                        cep3.style.backgroundColor = 'darkblue';
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
                    }else if(data.descparo === 'BOCADILLO'){
                        const cep3 = document.getElementById('lavado1');
                        cep3.style.backgroundColor = 'darkblue';
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

async function cambiarImagenMaquina(id_maquina, id_imagen) {
    try {
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);
        if (response.ok) {
            const data = await response.json();
            const imagenElement = document.getElementById(id_imagen);
            if (imagenElement) {
                if (data.descparo === '0' || data.descparo === '') {
                    imagenElement.src = "/images/cepilladora.png"; // Imagen para estado activo
                } else {
                    imagenElement.src = "/images/cepilladora_inactiva.png"; // Imagen para estado de paro
                }
            }
        } else {
            console.error(`Error al cargar el estado de la máquina ${id_maquina}:`, response.status);
            const imagenElement = document.getElementById(id_imagen);
            if (imagenElement) imagenElement.src = '../static/img/stop.png'; // Imagen de error
        }
    } catch (error) {
        console.error(`Error al cargar el estado de la máquina ${id_maquina}:`, error);
        const imagenElement = document.getElementById(id_imagen);
        if (imagenElement) imagenElement.src = '../static/img/stop.png'; // Imagen de error
    }
}


