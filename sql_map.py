import pyodbc
from sql_querys import (
    GET_PARAM_MAQUINA, GET_INFO_DESC, GET_INFO_EXP,
    GET_OF_ENVASADO, GET_OF_LAVADO, GET_OPERARIO
)

# Configuración de la conexión a la base de datos
DATABASE_CONFIG = {
    'server': '172.16.1.34',
    'user': 'luis.florez',
    'password': 'X!604492243862an',
    'database': 'mapexbp_leon'
}

def conectar():
    try:
        connection_string = f"""DRIVER={{ODBC Driver 17 for SQL Server}};
                                SERVER={DATABASE_CONFIG['server']};
                                DATABASE={DATABASE_CONFIG['database']};
                                UID={DATABASE_CONFIG['user']};
                                PWD={DATABASE_CONFIG['password']};
                                Encrypt=no;
                                TrustServerCertificate=yes;
        """
        
        conexion = pyodbc.connect(connection_string)
        print("Conexión a la base de datos exitosa")
        
        return conexion
    except pyodbc.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None
    
def execute_and_fetch_one(query, params, column_names=None):
   
    conexion = conectar()
    if not conexion:
        return None, {'error': 'No se pudo conectar a la base de datos'}, 500

    try:
        cursor = conexion.cursor()
        cursor.execute(query, params)
        resultado = cursor.fetchone()

        if resultado:
            cols = column_names
            if not cols and cursor.description:
                # Fallback to cursor.description if column_names are not explicitly provided
                cols = [column[0] for column in cursor.description]

            if cols:
                return dict(zip(cols, resultado)), None, None
            else:
                # If no column names or description, return original tuple with a warning
                print(f"WARNING: Could not determine column names for query. Returning raw tuple for query: {query}")
                return resultado, None, None
        else:
            return None, None, None # No data found
            
    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        return None, {'error': f'Error al consultar la BD: {sqlstate} - {ex}'}, 500
    finally:
        if conexion:
            conexion.close()

def execute_and_fetch_all(query, params, column_names=None):

    conexion = conectar()
    if not conexion:
        return None, {'error': 'No se pudo conectar a la base de datos'}, 500

    try:
        cursor = conexion.cursor()
        cursor.execute(query, params)
        resultados = cursor.fetchall()

        if not resultados:
            return [], None, None # No data found, return empty list

        cols = column_names
        if not cols and cursor.description:
            cols = [column[0] for column in cursor.description]

        if not cols:
            print(f"WARNING: Could not determine column names for query. Returning list of raw tuples for query: {query}")
            return resultados, None, None # Fallback

        mapped_results = []
        for row in resultados:
            mapped_results.append(dict(zip(cols, row)))
        
        return mapped_results, None, None
            
    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        return None, {'error': f'Error al consultar la BD: {sqlstate} - {ex}'}, 500
    finally:
        if conexion:
            conexion.close()

def get_expedition_data(id_maquina):
    columns = ['cus_matricula', 'cus_nombrePlataforma', 'cus_paletizacion', 'Desc_producto', 'cus_fechaRegistro', 'cus_huecos', 'fechaCreacion']
    data, err_res, status_code = execute_and_fetch_one(GET_INFO_EXP, (id_maquina,), columns)
    
    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data found

    return {
        'matricula': data.get('cus_matricula', ''),
        'cliente': data.get('cus_nombrePlataforma', ''),
        'paletizacion': data.get('cus_paletizacion', ''),
        'producto': data.get('Desc_producto', ''),
        'fecha': data.get('cus_fechaRegistro', ''),
        'huecos': data.get('cus_huecos', '')
    }, None, None
    
def get_download_data(id_maquina):
    columns = ['agricultor', 'variante', 'proveedor', 'lote', 'matricula']
    data, err_res, status_code = execute_and_fetch_one(GET_INFO_DESC, (id_maquina,), columns)
    
    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data found

    return {
        'agricultor': data.get('agricultor', ''),
        'variante': data.get('variante', ''),
        'proveedor': data.get('proveedor', ''),
        'lote': data.get('lote', ''),
        'matricula': data.get('matricula', '')
    }, None, None
    
def get_param_maquina(id_maquina):
    columns = ['oee', 'cal', 'ren', 'disp', 'buenas', 'malas', 'estado', 'of', 'descparo', 'hora_paro']
    data, err_res, status_code = execute_and_fetch_one(GET_PARAM_MAQUINA, (id_maquina,), columns)
    
    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data found
    
    return {
        'oee': data.get('oee', ''),
        'cal': data.get('cal', ''),
        'ren': data.get('ren', ''),
        'disp': data.get('disp', ''),
        'buenas': data.get('buenas', ''),
        'malas': data.get('malas', ''),
        'estado': data.get('estado', ''),
        'of': data.get('of', ''),
        'descparo': data.get('descparo', ''),
        'hora_paro': data.get('hora_paro', '')
    }, None, None
    
def get_of_lavado(id_maquina):
    columns = ['proveedor', 'agricultor', 'variedad', 'lote', 'bigbags', 'cepilladora','Fecha_generacion', 'tolvaDestino1', 'tolvaDestino2']
    data, err_res, status_code = execute_and_fetch_one(GET_OF_LAVADO, (id_maquina,), columns)
    
    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data
    
    return {
        'proveedor': data.get('proveedor', ''),
        'agricultor': data.get('agricultor', ''),
        'variedad': data.get('variedad', ''),
        'lote': data.get('lote', ''),
        'bigbags': data.get('bigbags', ''),
        'cepilladora': data.get('cepilladora', ''),
        'fecha': data.get('Fecha_generacion', ''),
        'tolvaDestino1': data.get('tolvaDestino1', ''),
        'tolvaDestino2': data.get('tolvaDestino2', '')
    }, None, None

def get_of_envasado(id_maquina):
    columns = ['lote', 'variante', 'producto', 'numeroOF', 'id_operacion',  'tolvaOrigen']
    data, err_res, status_code = execute_and_fetch_one(GET_OF_ENVASADO, (id_maquina,), columns)

    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data
    
    return {
        'lote': data.get('lote', ''),
        'variante': data.get('variante', ''),
        'producto': data.get('producto', ''),
        'numeroOF': data.get('numeroOF', ''),
        'id_operacion': data.get('id_operacion', ''),
        'tolvaOrigen': data.get('tolvaOrigen', '')
    }, None, None
    
def get_operarios(id_maquina):
    columns = ['operarios']
    data, err_res, status_code = execute_and_fetch_all(GET_OPERARIO, (id_maquina,), columns)
    
    if err_res: return None, err_res, status_code
    if not data: return None, None, None # No data
    
    return {
        'operarios': [row['operarios'] for row in data]
    }, None, None
