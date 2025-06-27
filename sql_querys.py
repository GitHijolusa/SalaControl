#Consulta para recoger los datos de las expediciones
GET_INFO_EXP = """SELECT hwe.cus_matricula, hwe.cus_nombrePlataforma, hwe.cus_paletizacion, cp.Desc_producto, hwe.cus_fechaRegistro, hwe.cus_huecos, hwe.fechaCreacion
        FROM
	        his_wam_expedicion hwe
        INNER JOIN
	        cfg_maquina cm ON hwe.cus_muelle = cm.Cod_maquina
        INNER JOIN
	        his_wam_expedicionLinea hwl ON hwe.id_his_wam_expedicion = hwl.id_his_wam_expedicion
        INNER JOIN
	        cfg_producto cp ON hwl.id_producto = cp.id_producto
        WHERE
	        cm.id_maquina = ?
		ORDER BY
			hwe.fechaCreacion DESC"""
    
#Consulta para recoger los datos de las descargas    
GET_INFO_DESC = """                        
                SELECT
                    t1.P73 AS Agricultor,
                    t1.P36 AS Variedad,
                    t1.P3 AS Proveedor,
                    t1.P35 AS Lote,
                    t1.P72 AS Matricula,
					t1.P78 AS Muelle,
                    t1.Fecha_generacion
                FROM
                    prd_erp_in t1
                INNER JOIN
                    cfg_maquina cm ON t1.P78 = cm.Cod_maquina
                WHERE
                    t1.id_operacion = 600
                    AND cm.Id_maquina = ?
                ORDER BY
                    t1.Fecha_generacion DESC"""
    
#Consulta para obtener los diferentes parametros de las maquinas
GET_PARAM_MAQUINA = """                
                SELECT 
                    Ag_Rt_OEE_Turno, 
                    Ag_Rt_Cal_Turno, 
                    Ag_Rt_Rend_Turno, 
                    Ag_Rt_Disp_Turno, 
                    ag_rt_unidades_turno, 
                    Rt_Unidades_nok, 
                    Rt_Desc_actividad, 
                    Rt_Cod_of,
                    Rt_Desc_paro,
                    Rt_Hora_inicio_paro
                FROM 
                    cfg_maquina
                WHERE 
                    id_maquina = ?"""
    
#Consulta para obtener los parametros de una orden de lavado
GET_OF_LAVADO = """SELECT
                t1.P21 AS Proveedor,
                t1.P62 AS Agricultor,
                t1.P75 AS Variedad,
                t1.P90 AS Lote,
                t1.P92 AS BigBags,
                t1.P81 AS Cepilladora,
                t1.Fecha_generacion,
                t1.P77 AS TolvaDestino1,
				t1.P78 AS TolvaDestino2,
                t1.P79 AS TolvaPR
            FROM
                prd_erp_in t1
            INNER JOIN
                cfg_maquina cm ON t1.P1 = cm.Rt_Cod_of 
            WHERE
                t1.id_operacion = 301
                AND cm.id_maquina = ?
            ORDER BY
                t1.Fecha_generacion DESC """
                
#Consulta para obtener los parametros de una orden de envasado
GET_OF_ENVASADO = """SELECT 
						t1.P96 AS Lote,
						t1.P75 AS Variedad,
                        t1.P15 AS Producto,
						t1.P1 AS numeroOF,
						t1.Id_operacion,
                        t1.P85 AS TolvaOrigen,
						t1.Fecha_generacion
                    FROM
                        prd_erp_in t1
					INNER JOIN
                        cfg_maquina cm ON t1.P1 = cm.Rt_Cod_of 
                    WHERE
						t1.Id_operacion = 301
                        AND cm.id_maquina = ?
					ORDER BY
						t1.Fecha_generacion DESC"""

#Consulta para obtener el operario asignado a cada maquina    
GET_OPERARIO = """SELECT Desc_operario FROM prd_operario WHERE id_maquina = ?"""

#Consulta para obtener las fabricaciones de envasado
GET_FAB_ENVASADO = """
                    SELECT
                        count (*) fabricaciones
                    FROM
                        cfg_maquina cm
                    JOIN
                        prd_erp_in pei ON cm.Rt_Cod_of = pei.P1
                    WHERE
                        pei.P8 = 'TERMINADO'
                        AND pei.P6 NOT IN ('PATATA RECUPERACION -45', 'PATATA RECUPERACIÓN', 'PATATA DESTRIO')
                        AND CONVERT(DATE, pei.fecha_generacion ) = CONVERT(DATE, GETDATE())
                        AND cm.Id_maquina = ?; 
                    """

