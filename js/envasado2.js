function updateAllData() {
    linea4Active = cambiarEstadoMaquina(92, 'status-linea4');
    linea3Active = cambiarEstadoMaquina(93, 'status-linea5');
    linea2Active = cambiarEstadoMaquina(94, 'status-linea6');
    linea1Active = cambiarEstadoMaquina(95, 'status-linea7');
    cargarParametrosEnvasado(92); // LINEA 4
    cargarParametrosEnvasado(93); // LINEA 5
    cargarParametrosEnvasado(94); // LINEA 6
    cargarParametrosEnvasado(95); // LINEA 7
    cargarOperario(95, 'env7');
    cargarOperario(94, 'env6');
    cargarOperario(93, 'env5');
    cargarOperario(92, 'env4');
    cargarOperario(85, 'pesadora7');
    cargarOperario(84, 'pesadora6');
    cargarOperario(83, 'pesadora5');
    cargarOperario(82, 'pesadora4');
    parametros_envasado(95, 'lote7', 'variedad7', 'producto7', 'tolvaOrigen7');
    parametros_envasado(94, 'lote6', 'variedad6', 'producto6',  'tolvaOrigen6');
    parametros_envasado(93, 'lote5', 'variedad5', 'producto5', 'tolvaOrigen5');
    parametros_envasado(92, 'lote4', 'variedad4', 'producto4',  'tolvaOrigen4');
    cargarEstadoEnvasado(92);
    cargarEstadoEnvasado(93);
    cargarEstadoEnvasado(94);
    cargarEstadoEnvasado(95);
    cargarEstadoEnvasado(96);
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
                case 96: 
                    setIndicatorStyle('disp7_1', 'label_disp7_1', data.disp, { unit: '%' });
                    setIndicatorStyle('ren7_1', 'label_ren7_1', data.ren, { unit: '%' });
                    setIndicatorStyle('cal7_1', 'label_cal7_1', data.cal, { unit: '%' });
                    setIndicatorStyle('oee7_1', 'label_oee7_1', data.oee, { unit: '%' });
                    document.getElementById('buenas7').value = data.buenas || '';
                    document.getElementById('malas7').value = data.malas || '';
                    document.getElementById('estado7').value = data.estado || '';
                    document.getElementById('tolvaOrigen7').value = data.tolva_origen || '';
                    document.getElementById('producto7').value = data.producto || ''; 
                    document.getElementById('lote7_1').value = data.lote || ''; 
                    document.getElementById('variedad7_1').value = data.variedad || '';
                    break;
                case 95: 
                    setIndicatorStyle('disp7', 'label_disp7', data.disp, { unit: '%' });
                    setIndicatorStyle('ren7', 'label_ren7', data.ren, { unit: '%' });
                    setIndicatorStyle('cal7', 'label_cal7', data.cal, { unit: '%' });
                    setIndicatorStyle('oee7', 'label_oee7', data.oee, { unit: '%' });
                    document.getElementById('buenas7').value = data.buenas || '';
                    document.getElementById('malas7').value = data.malas || '';
                    document.getElementById('estado7').value = data.estado || '';
                    document.getElementById('tolvaOrigen7').value = data.tolva_origen || '';
                    document.getElementById('producto7').value = data.producto || ''; 
                    document.getElementById('lote7').value = data.lote || ''; 
                    document.getElementById('variedad7').value = data.variedad || '';
                    document.getElementById('numof7').value = data.of || '';
                    break;
                case 94: //LINEA 6
                    setIndicatorStyle('disp6', 'label_disp6', data.disp, { unit: '%' });
                    setIndicatorStyle('ren6', 'label_ren6', data.ren, { unit: '%' });
                    setIndicatorStyle('cal6', 'label_cal6', data.cal, { unit: '%' });
                    setIndicatorStyle('oee6', 'label_oee6', data.oee, { unit: '%' });
                    document.getElementById('buenas6').value = data.buenas || '';
                    document.getElementById('malas6').value = data.malas || '';
                    document.getElementById('estado6').value = data.estado || '';
                    document.getElementById('tolvaOrigen6').value = data.tolva_origen || '';
                    document.getElementById('producto6').value = data.producto || '';
                    document.getElementById('lote6').value = data.lote || '';
                    document.getElementById('variedad6').value = data.variedad || '';
                    document.getElementById('numof6').value = data.of || '';
                    break;
                case 93: //LINEA 5
                    setIndicatorStyle('disp5', 'label_disp5', data.disp, { unit: '%' });
                    setIndicatorStyle('ren5', 'label_ren5', data.ren, { unit: '%' });
                    setIndicatorStyle('cal5', 'label_cal5', data.cal, { unit: '%' });
                    setIndicatorStyle('oee5', 'label_oee5', data.oee, { unit: '%' });
                    document.getElementById('buenas5').value = data.buenas || '';
                    document.getElementById('malas5').value = data.malas || '';
                    document.getElementById('estado5').value = data.estado || '';
                    document.getElementById('tolvaOrigen5').value = data.tolva_origen || '';
                    document.getElementById('producto5').value = data.producto || '';
                    document.getElementById('lote5').value = data.lote || '';
                    document.getElementById('variedad5').value = data.variedad || '';
                    document.getElementById('numof5').value = data.of || '';
                    break;
                case 92: //LINEA 4
                    setIndicatorStyle('disp4', 'label_disp4', data.disp, { unit: '%' });
                    setIndicatorStyle('ren4', 'label_ren4', data.ren, { unit: '%' });
                    setIndicatorStyle('cal4', 'label_cal4', data.cal, { unit: '%' });
                    setIndicatorStyle('oee4', 'label_oee4', data.oee, { unit: '%' });
                    document.getElementById('buenas4').value = data.buenas || '';
                    document.getElementById('malas4').value = data.malas || '';
                    document.getElementById('estado4').value = data.estado || '';
                    document.getElementById('tolvaOrigen4').value = data.tolva_origen || '';
                    document.getElementById('producto4').value = data.producto || '';
                    document.getElementById('lote4').value = data.lote || '';
                    document.getElementById('variedad4').value = data.variedad || '';
                    document.getElementById('numof4').value = data.of || '';
                    break;
            }
        } else {
            console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, response.status);
            // If there's an error, you can reset the indicators to an error state
            switch (id_maquina) {
                case 95:
                    setIndicatorStyle('disp7', 'label_disp7', NaN); setIndicatorStyle('ren7', 'label_ren7', NaN); setIndicatorStyle('cal7', 'label_cal7', NaN); setIndicatorStyle('oee7', 'label_oee7', NaN);
                    document.getElementById('buenas7').value = 'Error'; document.getElementById('malas7').value = 'Error'; document.getElementById('estado7').value = 'Error';
                    document.getElementById('tolvaOrigen7').value = 'Error';
                    document.getElementById('producto7').value = 'Error';
                    document.getElementById('lote7').value = 'Error';
                    document.getElementById('variedad7').value = 'Error';
                    break;
                case 94:
                    setIndicatorStyle('disp6', 'label_disp6', NaN); setIndicatorStyle('ren6', 'label_ren6', NaN); setIndicatorStyle('cal6', 'label_cal6', NaN); setIndicatorStyle('oee6', 'label_oee6', NaN);
                    document.getElementById('buenas6').value = 'Error'; document.getElementById('malas6').value = 'Error'; document.getElementById('estado6').value = 'Error';
                    document.getElementById('tolvaOrigen6').value = 'Error';
                    document.getElementById('producto6').value = 'Error';
                    document.getElementById('lote6').value = 'Error';
                    document.getElementById('variedad6').value = 'Error';
                    break;
                case 93:
                    setIndicatorStyle('disp5', 'label_disp5', NaN); setIndicatorStyle('ren5', 'label_ren5', NaN); setIndicatorStyle('cal5', 'label_cal5', NaN); setIndicatorStyle('oee5', 'label_oee5', NaN);
                    document.getElementById('buenas5').value = 'Error'; document.getElementById('malas5').value = 'Error'; document.getElementById('estado5').value = 'Error';
                    document.getElementById('tolvaOrigen5').value = 'Error';
                    document.getElementById('producto5').value = 'Error';
                    document.getElementById('lote5').value = 'Error';
                    document.getElementById('variedad5').value = 'Error';
                    break;
                case 92:
                    setIndicatorStyle('disp4', 'label_disp4', NaN); setIndicatorStyle('ren4', 'label_ren4', NaN); setIndicatorStyle('cal4', 'label_cal4', NaN); setIndicatorStyle('oee4', 'label_oee4', NaN);
                    document.getElementById('buenas4').value = 'Error'; document.getElementById('malas4').value = 'Error'; document.getElementById('estado4').value = 'Error';
                    document.getElementById('tolvaOrigen4').value = 'Error';
                    document.getElementById('producto4').value = 'Error';
                    document.getElementById('lote4').value = 'Error';
                    document.getElementById('variedad4').value = 'Error';
                    break;
            }
        }
    } catch (error) {
        console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, error);
        // If there's a network error, also reset to an error state
        switch (id_maquina) {
            case 90:
                setIndicatorStyle('disp7', 'label_disp7', NaN); setIndicatorStyle('ren7', 'label_ren7', NaN); setIndicatorStyle('cal7', 'label_cal7', NaN); setIndicatorStyle('oee7', 'label_oee7', NaN);
                document.getElementById('buenas7').value = 'Error'; document.getElementById('malas7').value = 'Error'; document.getElementById('estado7').value = 'Error';
                document.getElementById('tolvaOrigen7').value = 'Error';
                document.getElementById('producto7').value = 'Error';
                document.getElementById('lote7').value = 'Error';
                document.getElementById('variedad7').value = 'Error';
                break;
            case 88:
                setIndicatorStyle('disp6', 'label_disp6', NaN); setIndicatorStyle('ren6', 'label_ren6', NaN); setIndicatorStyle('cal6', 'label_cal6', NaN); setIndicatorStyle('oee6', 'label_oee6', NaN);
                document.getElementById('buenas6').value = 'Error'; document.getElementById('malas6').value = 'Error'; document.getElementById('estado6').value = 'Error';
                document.getElementById('tolvaOrigen6').value = 'Error';
                document.getElementById('producto6').value = 'Error';
                document.getElementById('lote6').value = 'Error';
                document.getElementById('variedad6').value = 'Error';
                break;
            case 86:
                setIndicatorStyle('disp5', 'label_disp5', NaN); setIndicatorStyle('ren5', 'label_ren5', NaN); setIndicatorStyle('cal5', 'label_cal5', NaN); setIndicatorStyle('oee5', 'label_oee5', NaN);
                document.getElementById('buenas5').value = 'Error'; document.getElementById('malas5').value = 'Error'; document.getElementById('estado5').value = 'Error';
                document.getElementById('tolvaOrigen5').value = 'Error';
                document.getElementById('producto5').value = 'Error';
                document.getElementById('lote5').value = 'Error';
                document.getElementById('variedad5').value = 'Error';
                break;
            case 84:
                setIndicatorStyle('disp4', 'label_disp4', NaN); setIndicatorStyle('ren4', 'label_ren4', NaN); setIndicatorStyle('cal4', 'label_cal4', NaN); setIndicatorStyle('oee4', 'label_oee4', NaN);
                document.getElementById('buenas4').value = 'Error'; document.getElementById('malas4').value = 'Error'; document.getElementById('estado4').value = 'Error';
                document.getElementById('tolvaOrigen4').value = 'Error';
                document.getElementById('producto4').value = 'Error';
                document.getElementById('lote4').value = 'Error';
                document.getElementById('variedad4').value = 'Error';
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
            document.getElementById(id_operario).value = (data.operarios ? data.operarios.join(', ') : '').toUpperCase();
        } 
    } catch (error) {
        console.error('Error al cargar el dato:', error);
        document.getElementById(id_operario).value = 'Error';
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

        console.error(`Error al cargar los parámetros de la máquina ${id_maquina}:`, error);
    }
}

async function cargarEstadoEnvasado(id_maquina) {  

    try {
        const response = await fetch(`${backendUrl}/api/maquina_activa/${id_maquina}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Estado maquinas cargados:', data);

            switch (id_maquina) {
                case 96:
                    if(data.descparo == '0' || data.descparo == ''){
                        const maq1 = document.getElementById('estado7_1_2');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado7_1_2');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 95:
                    if(data.descparo == '0' || data.descparo == ''){
                        const maq1 = document.getElementById('estado7_1_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado7_1_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 94:
                    if(data.descparo == '0' || data.descparo == ''){
                        const maq1 = document.getElementById('estado6_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado6_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 93:
                    if(data.descparo == '0' || data.descparo == ''){
                        const maq1 = document.getElementById('estado5_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado5_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;
                case 92:
                    if(data.descparo == '0' || data.descparo == ''){
                        const maq1 = document.getElementById('estado4_1');
                        maq1.checked = true;
                    }else{
                        const maq1 = document.getElementById('estado4_1');
                        maq1.checked = false;
                        maq1.parentElement.style.backgroundColor = '';
                    }
                    break;                 
            }
        }
    }catch (error) {
        console.error('Error al cargar el dato:', error);
    }
}