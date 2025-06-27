function updateAllData() {
    linea3Active = cambiarEstadoMaquina(90, 'status-linea3');
    linea2Active = cambiarEstadoMaquina(88, 'status-linea2');
    linea1Active = cambiarEstadoMaquina(86, 'status-linea1');
    cargarParametrosEnvasado(90); // LINEA 3
    cargarParametrosEnvasado(88); // LINEA 2
    cargarParametrosEnvasado(86); // LINEA 1
    cargarOperario(91, 'env3_1');
    cargarOperario(90, 'env1');
    cargarOperario(89, 'env2_1');
    cargarOperario(88, 'env2');
    cargarOperario(87, 'env1_1');
    cargarOperario(86, 'env3');
    cargarOperario(98, 'traspaleteros'); //Operarios de traspas
    cargarOperario(99, 'abastecimiento'); //Operarios de cajas
    cargarOperario(79, 'pesadora1');
    cargarOperario(80, 'pesadora2');
    cargarOperario(81, 'pesadora3');
    parametros_envasado(90, 'lote3', 'variedad3', 'producto3, tolvaOrigen3');
    parametros_envasado(88, 'lote2', 'variedad2', 'producto2', 'tolvaOrigen2');
    parametros_envasado(86, 'lote1', 'variedad1', 'producto1',  'tolvaOrigen1');
    cargarEstadoEnvasado(91);
    cargarEstadoEnvasado(90);
    cargarEstadoEnvasado(89);
    cargarEstadoEnvasado(88);
    cargarEstadoEnvasado(87);
    cargarEstadoEnvasado(86);
    obtenerFabricacionesEnvasado(90, 'palets3');
    obtenerFabricacionesEnvasado(88, 'palets2');
    obtenerFabricacionesEnvasado(86, 'palets1');
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllData();
});

const backendUrl = 'http://127.0.0.1:5000';

async function cargarParametrosEnvasado(id_maquina) {
    try {
        const response = await fetch(`${backendUrl}/api/parametros_maquina/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Parámetros de la máquina ${id_maquina} cargados:`, data);

            // Actualizar los campos de entrada con los datos recibidos y aplicar estilos
            switch (id_maquina) {
                case 90: // LINEA 3
                    setIndicatorStyle('disp3', 'label_disp3', data.disp, { unit: '%' });
                    setIndicatorStyle('ren3', 'label_ren3', data.ren, { unit: '%' });
                    setIndicatorStyle('cal3', 'label_cal3', data.cal, { unit: '%' });
                    setIndicatorStyle('oee3', 'label_oee3', data.oee, { unit: '%' });
                    document.getElementById('buenas3').value = data.buenas || '';
                    document.getElementById('malas3').value = data.malas || '';
                    document.getElementById('estado3').value = data.estado || '';
                    document.getElementById('numof3').value = data.of || '';
                    break;
                case 88: // LINEA 2
                    setIndicatorStyle('disp2', 'label_disp2', data.disp, { unit: '%' });
                    setIndicatorStyle('ren2', 'label_ren2', data.ren, { unit: '%' });
                    setIndicatorStyle('cal2', 'label_cal2', data.cal, { unit: '%' });
                    setIndicatorStyle('oee2', 'label_oee2', data.oee, { unit: '%' });
                    document.getElementById('buenas2').value = data.buenas || '';
                    document.getElementById('malas2').value = data.malas || '';
                    document.getElementById('estado2').value = data.estado || '';
                    document.getElementById('numof2').value = data.of || '';
                    break;
                case 86: // LINEA 1
                    setIndicatorStyle('disp1', 'label_disp1', data.disp, { unit: '%' });
                    setIndicatorStyle('ren1', 'label_ren1', data.ren, { unit: '%' });
                    setIndicatorStyle('cal1', 'label_cal1', data.cal, { unit: '%' });
                    setIndicatorStyle('oee1', 'label_oee1', data.oee, { unit: '%' });
                    document.getElementById('buenas1').value = data.buenas || '';
                    document.getElementById('malas1').value = data.malas || '';
                    document.getElementById('estado1').value = data.estado || '';
                    document.getElementById('numof1').value = data.of || '';
                    break;
            }
        } else {
            console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, response.status);
            // Si hay un error, puedes resetear los indicadores a un estado de error
            switch (id_maquina) {
                case 90:
                    setIndicatorStyle('disp3', 'label_disp3', NaN); setIndicatorStyle('ren3', 'label_ren3', NaN); setIndicatorStyle('cal3', 'label_cal3', NaN); setIndicatorStyle('oee3', 'label_oee3', NaN);
                    document.getElementById('buenas3').value = 'Error'; document.getElementById('malas3').value = 'Error'; document.getElementById('estado3').value = 'Error';
                    break;
                case 88:
                    setIndicatorStyle('disp2', 'label_disp2', NaN); setIndicatorStyle('ren2', 'label_ren2', NaN); setIndicatorStyle('cal2', 'label_cal2', NaN); setIndicatorStyle('oee2', 'label_oee2', NaN);
                    document.getElementById('buenas2').value = 'Error'; document.getElementById('malas2').value = 'Error'; document.getElementById('estado2').value = 'Error';
                    break;
                case 86:
                    setIndicatorStyle('disp1', 'label_disp1', NaN); setIndicatorStyle('ren1', 'label_ren1', NaN); setIndicatorStyle('cal1', 'label_cal1', NaN); setIndicatorStyle('oee1', 'label_oee1', NaN);
                    document.getElementById('buenas1').value = 'Error'; document.getElementById('malas1').value = 'Error'; document.getElementById('estado1').value = 'Error';
                    break;
            }
        }
    } catch (error) {
        console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, error);
        // Si hay un error de red, también resetea a un estado de error
        switch (id_maquina) {
            case 90:
                setIndicatorStyle('disp3', 'label_disp3', NaN); setIndicatorStyle('ren3', 'label_ren3', NaN); setIndicatorStyle('cal3', 'label_cal3', NaN); setIndicatorStyle('oee3', 'label_oee3', NaN);
                document.getElementById('buenas3').value = 'Error'; document.getElementById('malas3').value = 'Error'; document.getElementById('estado3').value = 'Error';
                break;
            case 88:
                setIndicatorStyle('disp2', 'label_disp2', NaN); setIndicatorStyle('ren2', 'label_ren2', NaN); setIndicatorStyle('cal2', 'label_cal2', NaN); setIndicatorStyle('oee2', 'label_oee2', NaN);
                document.getElementById('buenas2').value = 'Error'; document.getElementById('malas2').value = 'Error'; document.getElementById('estado2').value = 'Error';
                break;
            case 86:
                setIndicatorStyle('disp1', 'label_disp1', NaN); setIndicatorStyle('ren1', 'label_ren1', NaN); setIndicatorStyle('cal1', 'label_cal1', NaN); setIndicatorStyle('oee1', 'label_oee1', NaN);
                document.getElementById('buenas1').value = 'Error'; document.getElementById('malas1').value = 'Error'; document.getElementById('estado1').value = 'Error';
                break;
        }
    }
}

async function cargarOperario(id_maquina, id_operario) {

    try {
        const response = await fetch(`${backendUrl}/api/operarios/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Dato cargado:', data);
            document.getElementById(id_operario).value = (data.operarios ? data.operarios.join('\n') : '').toUpperCase();
        } 
    } catch (error) {
        console.error('Error al cargar el dato:', error);
    }
}

async function parametros_envasado(id_maquina, id_lote, id_variedad, id_producto, id_tolvaOrigen) {

    try {
        const response = await fetch(`${backendUrl}/api/info_puesto_envasado/${id_maquina}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Datos envasado cargados:', data);
            document.getElementById(id_lote).value = data.lote || '';
            document.getElementById(id_variedad).value = data.variedad || '';
            document.getElementById(id_producto).value = data.producto || '';
            document.getElementById(id_tolvaOrigen).value = data.tolvaOrigen || '';
        } else {
            console.error('Error al cargar los datos del camion', response.status);
        }
    } catch (error) {
        console.error('Error al cargar el dato:', error);
    }
}

async function cargarEstadoEnvasado(id_maquina) {  

    try {
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Estado maquinas cargados:', data);

            switch (id_maquina) {
                case 91:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado3_1_2');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado3_1_2');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 90:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado3_1_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado3_1_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 89:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado2_1_2');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado2_1_2');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 88:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado2_1_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado2_1_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 87:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado1_1_2');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado1_1_2');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 86:
                    if(data.descparo == '0' || data.descparo == '' || data.descparo == '--'){
                        const maq1 = document.getElementById('estado1_1_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado1_1_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;                  
            }

            if(estado3_1_1.checked == true && estado3_1_2.checked == true) {

                const maq1 = document.getElementById('estado3_1');
                maq1.checked = true;
            
            }else if(estado3_1_1.checked == true && estado3_1_2.checked == false || estado3_1_1.checked == false && estado3_1_2.checked == true){

                const maq1 = document.getElementById('estado3_1');
                maq1.checked = false;
                maq1.parentElement.style.backgroundColor = 'yellow';
            }

            if(estado2_1_1.checked == true && estado2_1_2.checked == true) {

                const maq1 = document.getElementById('estado2_1');
                maq1.checked = true;
            
            }else if(estado2_1_1.checked == true && estado2_1_2.checked == false || estado2_1_1.checked == false && estado2_1_2.checked == true){

                const maq1 = document.getElementById('estado2_1');
                maq1.style.backgroundColor = 'yellow';
            }
            
            if(estado1_1_1.checked == true && estado1_1_2.checked == true) {

                const maq1 = document.getElementById('estado1_1');
                maq1.checked = true;
            }
        }
    }catch (error) {
        console.error('Error al cargar el dato:', error);
    }
}

async function obtenerFabricacionesEnvasado(id_maquina, id_fabricaciones) {
    try {
        const response = await fetch(`${backendUrl}/api/fabricaciones_envasado/${id_maquina}`);
        if (response.ok) {
            const data = await response.json();
            console.log(`Fabricaciones de la máquina ${id_maquina} cargadas:`, data);
            document.getElementById(id_fabricaciones).value = data.fabricaciones;
        } else {
            console.error(`Error al cargar las fabricaciones de la máquina ${id_maquina}:`, response.status);
        }
    } catch (error) {
        console.error(`Error al cargar las fabricaciones de la máquina ${id_maquina}:`, error);
    }
}
