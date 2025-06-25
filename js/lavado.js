function updateAllData() {
    updateDateTime();
    updateLastRefresh();
    cambiarEstadoMaquina(76, 'status-linea3');
    cambiarEstadoMaquina(75, 'status-linea2');
    cambiarEstadoMaquina(74, 'status-linea1');
    cargarParametrosLavado(76);
    cargarParametrosLavado(75);
    cargarParametrosLavado(74);
    cargar_operarios(76, 'carr3');
    cargar_operarios(75, 'carr2');
    cargar_operarios(74, 'carr1');
    obtenerInfoLavado(76);
    obtenerInfoLavado(75);
    obtenerInfoLavado(74);
    cambiarImagenMaquina(76, 'calibrador3');
    cambiarImagenMaquina(75, 'calibrador2');
    cambiarImagenMaquina(74, 'calibrador1');
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllData();
});

const backendUrl = 'http://127.0.0.1:5000';

async function cargarParametrosLavado(id_maquina) {
    try {
        const response = await fetch(`${backendUrl}/api/parametros_maquina/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Parámetros de lavado de la máquina ${id_maquina} cargados:`, data);

            // Actualizar los campos de entrada con los datos recibidos
            // AND APPLY STYLES TO LABELS
            switch (id_maquina) {
                case 76: // LINEA 3
                    setIndicatorStyle('disp3', 'label_disp3', data.disp, { unit: '%' });
                    setIndicatorStyle('ren3', 'label_ren3', data.ren, { unit: '%' });
                    setIndicatorStyle('cal3', 'label_cal3', data.cal, { unit: '%' });
                    setIndicatorStyle('oee3', 'label_oee3', data.oee, { unit: '%' });
                    document.getElementById('buenas3').value = data.buenas || '';
                    document.getElementById('malas3').value = data.malas || '';
                    document.getElementById('estado3').value = data.estado || '';
                    document.getElementById('numof3').value = data.of || '';

                    // Check if data.paro is 0, if so, clear paro and inicioParo fields
                    if (data.paro === 0) {
                        document.getElementById('paro3').value = '';
                        document.getElementById('inicioParo3').value = '';
                    } else {
                        document.getElementById('paro3').value = data.descparo || '';
                        // Only format and display hora_paro if it exists
                        if (data.hora_paro) {
                        const date = new Date(data.hora_paro);
                        document.getElementById('inicioParo3').value = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        } else { 
                            document.getElementById('inicioParo3').value = ''; 
                        }
                    }
                    break;
                case 75: // LINEA 2
                    setIndicatorStyle('disp2', 'label_disp2', data.disp, { unit: '%' });
                    setIndicatorStyle('ren2', 'label_ren2', data.ren, { unit: '%' });
                    setIndicatorStyle('cal2', 'label_cal2', data.cal, { unit: '%' });
                    setIndicatorStyle('oee2', 'label_oee2', data.oee, { unit: '%' });
                    document.getElementById('buenas2').value = data.buenas || '';
                    document.getElementById('malas2').value = data.malas || '';
                    document.getElementById('estado2').value = data.estado || '';
                    document.getElementById('numof2').value = data.of || '';
                    if (data.paro === 0) {
                        document.getElementById('paro2').value = '';
                        document.getElementById('inicioParo2').value = '';
                    } else {
                        document.getElementById('paro2').value = data.descparo || '';
                        // Only format and display hora_paro if it exists
                        if (data.hora_paro) {
                        const date = new Date(data.hora_paro);
                        document.getElementById('inicioParo2').value = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        } else { 
                            document.getElementById('inicioParo2').value = ''; 
                        }
                    } 
                    break;
                case 74: // LINEA 1
                    setIndicatorStyle('disp1', 'label_disp1', data.disp, { unit: '%' });
                    setIndicatorStyle('ren1', 'label_ren1', data.ren, { unit: '%' });
                    setIndicatorStyle('cal1', 'label_cal1', data.cal, { unit: '%' });
                    setIndicatorStyle('oee1', 'label_oee1', data.oee, { unit: '%' });
                    document.getElementById('buenas1').value = data.buenas || '';
                    document.getElementById('malas1').value = data.malas || '';
                    document.getElementById('estado1').value = data.estado || '';
                    document.getElementById('numof1').value = data.of || '';
                    document.getElementById('tolva_destino_1_1').value = data.tolvaDestino1 || '';
                    document.getElementById('tolva_destino_2_1').value = data.tolvaDestino2 || '';                    if (data.paro === 0) {
                        document.getElementById('paro1').value = '';
                        document.getElementById('inicioParo1').value = '';
                    } else {
                        document.getElementById('paro1').value = data.descparo || '';
                        // Only format and display hora_paro if it exists
                        if (data.hora_paro) {
                        const date = new Date(data.hora_paro);
                        document.getElementById('inicioParo1').value = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        } else { 
                            document.getElementById('inicioParo1').value = ''; 
                        }
                    }
                    break;
            }
        } else {
            console.error(`Error al cargar los parámetros de lavado de la máquina ${id_maquina}:`, response.status);
            // Handle error state for indicators if API fails
            switch (id_maquina) {
                case 76: setIndicatorStyle('disp3', 'label_disp3', NaN); setIndicatorStyle('ren3', 'label_ren3', NaN); setIndicatorStyle('cal3', 'label_cal3', NaN); setIndicatorStyle('oee3', 'label_oee3', NaN); break;
                case 75: setIndicatorStyle('disp2', 'label_disp2', NaN); setIndicatorStyle('ren2', 'label_ren2', NaN); setIndicatorStyle('cal2', 'label_cal2', NaN); setIndicatorStyle('oee2', 'label_oee2', NaN); break;
                case 74: setIndicatorStyle('disp1', 'label_disp1', NaN); setIndicatorStyle('ren1', 'label_ren1', NaN); setIndicatorStyle('cal1', 'label_cal1', NaN); setIndicatorStyle('oee1', 'label_oee1', NaN); break;
            }
        }
    } catch (error) {
        console.error(`Error al cargar los parámetros de lavado de la máquina ${id_maquina}:`, error);
        // Handle network error state for indicators
        switch (id_maquina) {
            case 76: setIndicatorStyle('disp3', 'label_disp3', NaN); setIndicatorStyle('ren3', 'label_ren3', NaN); setIndicatorStyle('cal3', 'label_cal3', NaN); setIndicatorStyle('oee3', 'label_oee3', NaN); break;
            case 75: setIndicatorStyle('disp2', 'label_disp2', NaN); setIndicatorStyle('ren2', 'label_ren2', NaN); setIndicatorStyle('cal2', 'label_cal2', NaN); setIndicatorStyle('oee2', 'label_oee2', NaN); break;
            case 74: setIndicatorStyle('disp1', 'label_disp1', NaN); setIndicatorStyle('ren1', 'label_ren1', NaN); setIndicatorStyle('cal1', 'label_cal1', NaN); setIndicatorStyle('oee1', 'label_oee1', NaN); break;
        }
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

async function obtenerInfoLavado(id_maquina) {

    try {
        const response = await fetch(`${backendUrl}/api/info_puesto_lavado/${id_maquina}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`Información de lavado de la máquina ${id_maquina} cargada:`, data);

            switch (id_maquina) {
                case 76: // LINEA 3
                    document.getElementById('big_bags_lavar_3').value = data.bigbags || '';;
                    document.getElementById('numero_lote_3').value = data.lote || '';
                    document.getElementById('variedad3').value = data.variedad || '';
                    document.getElementById('agricultor3').value = data.agricultor || '';
                    document.getElementById('proveedor3').value = data.proveedor || '';
                    document.getElementById('tolva_destino_1_3').value = data.tolvaDestino1 || '';
                    document.getElementById('tolva_destino_2_3').value = data.tolvaDestino2 || '';
                    break;
                case 75: // LINEA 2
                    document.getElementById('big_bags_lavar_2').value = data.bigbags || '';;
                    document.getElementById('numero_lote_2').value = data.lote || '';
                    document.getElementById('variedad2').value = data.variedad || '';
                    document.getElementById('agricultor2').value = data.agricultor || '';
                    document.getElementById('proveedor2').value = data.proveedor || '';
                    document.getElementById('tolva_destino_1_2').value = data.tolvaDestino1 || '';
                    document.getElementById('tolva_destino_2_2').value = data.tolvaDestino2 || '';
                    break;
                case 74: // LINEA 1 
                    document.getElementById('big_bags_lavar_1').value = data.bigbags || '';;
                    document.getElementById('numero_lote_1').value = data.lote || '';
                    document.getElementById('variedad1').value = data.variedad || '';
                    document.getElementById('agricultor1').value = data.agricultor || '';
                    document.getElementById('proveedor1').value = data.proveedor || '';
                    document.getElementById('tolva_destino_1_1').value = data.tolvaDestino1 || '';
                    document.getElementById('tolva_destino_2_1').value = data.tolvaDestino2 || '';
                    break;
            }
        }
    } catch (error) {
        console.error(`Error al cargar la información de lavado de la máquina ${if_maquina}:`, error);
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
                    imagenElement.src = "/images/calibrador.png"; // Imagen para estado activo
                } else {
                    imagenElement.src = "/images/calibrador_inactiva.png"; // Imagen para estado de paro
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

