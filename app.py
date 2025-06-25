import threading
import time
from flask import Flask, jsonify, render_template, request
import pyodbc
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from sql_map import (
    conectar, get_expedition_data, get_download_data, get_param_maquina,
    get_of_lavado, get_of_envasado, get_operarios
)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:3000"}}) # Permite CORS para todas las rutas Flask y para el Socket.IO si la versión lo requiere.

socketio = SocketIO(app, cors_allowed_origins="*") # Configura Socket.IO con CORS

# Evento para conectar clientes
@socketio.on('connect')
def handle_connect():
    print('Cliente conectado')

# Evento para desconectar clientes
@socketio.on('disconnect')
def handle_disconnect():
    print('Cliente desconectado')
    
def send_update_event():
    while True:
        time.sleep(60)
        print("Enviando evento de actualización a todos los clientes...")
        # 'update_data_signal' es el nombre del evento que los clientes escucharán
        socketio.emit('update_data_signal', {'message': 'Es hora de actualizar los datos!'})

@app.route('/lavado.html')
def lavado_page():
    return render_template('lavado.html')

@app.route('/cepillado.html')
def cepillado_page():
    return render_template('cepillado.html')

@app.route('/carga.html')
def carga_page():
    return render_template('carga.html')

@app.route('/descarga.html')
def descarga_page():
    return render_template('descarga.html')

@app.route('/envasado.html')
def envasado_page():
    return render_template('envasado.html')

@app.route('/envasado2.html')
def envasado2_page():
    return render_template('envasado2.html')

#Obtener las informacion de camiones de expediciones
@app.route('/api/carga/<int:id_maquina>', methods=['GET'])
def obtener_matricula (id_maquina):
    
    data, err_res, status_code = get_expedition_data(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron datos de expedición para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)

#cargar informacion de descargas   
@app.route('/api/info_descarga/<int:id_maquina>', methods=['GET'])
def obtener_info_descarga(id_maquina):

    data, err_res, status_code = get_download_data(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron datos de descargas para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)

#Obtener el estado de la maquina si está activada o no
@app.route('/api/maquina_activa/<int:id_maquina>', methods=['GET'])
def maquina_activa(id_maquina):

    data, err_res, status_code = get_param_maquina(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontro el estado de la máquina con ID {id_maquina}'}), 404
            
    return jsonify(data)

#Obtener los parametros de la maquina
@app.route('/api/parametros_maquina/<int:id_maquina>', methods=['GET'])
def obtener_parametros_lavado(id_maquina):

    data, err_res, status_code = get_param_maquina(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron datos de descargas para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)
        
#Obtener los operios de la maquinas
@app.route('/api/operarios/<int:id_maquina>', methods=['GET'])
def obtener_operarios(id_maquina):

    data, err_res, status_code = get_operarios(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron operarios para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)

#Obtener la informacion de una orden de lavado
@app.route('/api/info_puesto_lavado/<int:id_maquina>', methods=['GET'])
def obtener_info_puesto_lavado(id_maquina):

    data, err_res, status_code = get_of_lavado(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron datos de lavado para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)
    
    
@app.route('/api/info_puesto_envasado/<int:id_maquina>', methods=['GET'])
def obtener_info_puesto_envasado(id_maquina):

    data, err_res, status_code = get_of_envasado(id_maquina)
    
    if err_res: return jsonify(err_res), status_code
    if not data: return jsonify({'error': f'No se encontraron datos de envasado para la máquina con ID {id_maquina}'}), 404
    
    return jsonify(data)
    
if __name__ == '__main__':
    socketio.start_background_task(target=send_update_event)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)