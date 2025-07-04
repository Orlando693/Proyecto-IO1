import pulp # Esta librería es como el "cerebro" que nos ayuda a resolver problemas de optimización.
import openai # Esta librería nos permite usar la inteligencia artificial de OpenAI para generar textos.
import os # Nos ayuda a leer configuraciones importantes de nuestro sistema, como la clave de OpenAI.
from dotenv import load_dotenv

load_dotenv()

def optimizar_asignacion(aulas, grupos, bloques_disponibles, delta, lambda_):
    """
    Esta función es el corazón de nuestro sistema. Su objetivo principal es encontrar la mejor manera
    de asignar grupos de estudiantes a las aulas y horarios disponibles, pensando en la eficiencia
    del uso del espacio. Además, después de encontrar la asignación, utiliza inteligencia artificial
    para generar un resumen y un análisis amigable de los resultados.

    Parámetros de entrada:
    - aulas: La lista de todas las aulas disponibles con sus características (nombre, capacidad, piso).
    - grupos: La lista de todos los grupos de estudiantes, incluyendo cuántos estudiantes tiene cada uno.
    - bloques_disponibles: Los momentos del día en los que se pueden asignar clases (ej. "07:00-09:15").
    - delta: Un número que representa qué tanta "subutilización" (espacio vacío) de un aula
             estamos dispuestos a tolerar antes de aplicar una penalización.
    - lambda_: Un factor que indica qué tan importante es para nosotros penalizar el espacio que
               no se utiliza de forma eficiente en las aulas.
    """
    
    # --- Validación previa de datos ---
    # Verificamos si hay algún grupo que no puede ser asignado a ninguna aula
    max_capacidad_aula = max(aula["capacidad"] for aula in aulas)
    grupos_problematicos = [
        grupo for grupo in grupos 
        if grupo["cantidad"] > max_capacidad_aula
    ]
    
    if grupos_problematicos:
        error_msg = f"Error: Los siguientes grupos no pueden ser asignados porque exceden la capacidad máxima de las aulas (máximo: {max_capacidad_aula}):\n"
        for grupo in grupos_problematicos:
            error_msg += f"- Grupo '{grupo['nombre']}' ({grupo['materia']}): {grupo['cantidad']} estudiantes\n"
        error_msg += "\nSoluciones posibles:\n"
        error_msg += "1. Aumentar la capacidad de las aulas existentes\n"
        error_msg += "2. Dividir los grupos grandes en grupos más pequeños\n"
        error_msg += "3. Añadir nuevas aulas con mayor capacidad"
        
        return {
            "error": error_msg,
            "grupos_problematicos": grupos_problematicos,
            "capacidad_maxima_disponible": max_capacidad_aula
        }

    # --- Configuración de la Inteligencia Artificial (OpenAI) ---
    # Aquí preparamos la conexión con el servicio de inteligencia artificial.
    # Es crucial que la "clave secreta" de OpenAI (API Key) esté configurada de forma segura
    # en las variables de entorno de tu sistema. Si no la encuentra, no podremos generar el resumen.
    openai_api_key = os.getenv("OPENAI_API_KEY")
    print("OpenAI API Key:", openai_api_key) # Esta línea es solo para verificar que la clave se está leyendo.
    client = None
    if openai_api_key:
        client = openai.OpenAI(api_key=openai_api_key)
    else:
        print("Error: Se requiere una clave de API de OpenAI para generar el resumen.")
        print("Por favor, asegúrate de haber configurado la variable de entorno OPENAI_API_KEY.")


    # --- Paso 1: Definición del Problema de Optimización ---
    # Creamos un "problema" para que el optimizador lo resuelva. Le decimos que queremos
    # "maximizar" algo, que en este caso es la cantidad de estudiantes bien asignados
    # y el buen uso de las aulas.
    prob = pulp.LpProblem("Asignacion_Aulas", pulp.LpMaximize)

    # Definición de los patrones de días para las clases.
    # Por ejemplo, un grupo puede tener clases los "Lunes, Miércoles y Viernes" (LMV)
    # o los "Martes y Jueves" (MJ).
    DIAS_POR_PATRON = {
        "LMV": ["Lunes", "Miércoles", "Viernes"],
        "MJ": ["Martes", "Jueves"]
    }
    PATRONES = DIAS_POR_PATRON.keys() # Obtenemos una lista de los nombres de los patrones (LMV, MJ).

    # Identificadores para trabajar con los datos:
    # I: Representa a cada uno de los grupos de estudiantes.
    # J: Representa a cada una de las aulas.
    # B: Son los bloques de horario disponibles (ej. "07:00-09:15").
    I = range(len(grupos))
    J = range(len(aulas))
    B = bloques_disponibles

    # Creamos una lista de todas las posibles "franjas de tiempo" que podemos usar.
    # Una franja de tiempo es una combinación de un día (Lunes, Martes, etc.) y un bloque horario.
    TODOS_LOS_DIAS_VALIDOS = list(set(d for pattern_days in DIAS_POR_PATRON.values() for d in pattern_days))
    T_todos_los_slots = [(d, b) for d in TODOS_LOS_DIAS_VALIDOS for b in B]

    # --- Paso 2: Definición de las Variables de Decisión ---
    # Estas son las "incógnitas" que el optimizador debe resolver. Son como interruptores
    # que se encienden (valor 1) o apagan (valor 0) para indicar si una asignación ocurre o no.

    # x_assign_full_pattern: Nos dice si un grupo (i) es asignado a un aula (j),
    # en un bloque de horario (b), siguiendo un patrón de días (p).
    # Por ejemplo: ¿El Grupo A va al Aula 1.1 en el Bloque "07:00-09:15" los Lunes, Miércoles y Viernes?
    x_assign_full_pattern = pulp.LpVariable.dicts("x_pattern", (I, J, B, PATRONES), cat="Binary")

    # x_slot: Nos dice si un grupo (i) está asignado a un aula (j) en una franja de tiempo específica (d, b).
    # Esta variable es una consecuencia de la anterior y nos ayuda a aplicar las reglas diarias.
    x_slot = pulp.LpVariable.dicts("x_slot", (I, J, T_todos_los_slots), cat="Binary")

    # U: Mide cuánto "espacio vacío" hay en un aula si se le asigna un grupo.
    # Esto nos permite penalizar las asignaciones ineficientes. Solo se activa si hay penalización.
    U = pulp.LpVariable.dicts("U", (I, J, T_todos_los_slots), lowBound=0, cat="Continuous")

    # --- Paso 3: Definición de la Función Objetivo ---
    # Esta es la "meta" que el optimizador intenta alcanzar. Queremos maximizar la cantidad total
    # de estudiantes que son asignados a clases, y al mismo tiempo, minimizar el espacio que
    # queda sin usar de forma penalizable en las aulas.
    prob += (
        pulp.lpSum(x_slot[i][j][(d, b)] * grupos[i]["cantidad"] for i in I for j in J for (d, b) in T_todos_los_slots)
        - lambda_ * pulp.lpSum(U[i][j][(d, b)] for i in I for j in J for (d, b) in T_todos_los_slots)
    ), "ObjetivoMaximizarAsignacion"

    # --- Paso 4: Definición de las Restricciones (Reglas del Juego) ---
    # Estas son las condiciones que la solución debe cumplir obligatoriamente.
    # El optimizador buscará la mejor asignación posible que satisfaga TODAS estas reglas.

    # Restricción 1: Asignación Única por Grupo
    # Descripción: Cada grupo de estudiantes debe ser asignado a UNA y solo UNA combinación
    # de aula, bloque horario y patrón de días (LMV o MJ).
    # Esto asegura que ningún grupo se quede sin aula o sea duplicado en el sistema.
    # Impacto: Garantiza una cobertura completa y sin conflictos de los grupos.
    for i in I:
        prob += pulp.lpSum(x_assign_full_pattern[i][j][b][p] for j in J for b in B for p in PATRONES) == 1, \
                f"Grupo_{i}_UnaAsignacionCompleta"

    # Restricción 2: Vínculo entre Patrones y Slots Diarios
    # Descripción: Esta regla es fundamental para conectar nuestra decisión de asignar
    # un grupo a un "patrón" (ej. LMV) con la ocupación real de cada día y bloque individual.
    # Si un grupo es asignado a un patrón y un bloque, esta restricción fuerza a que el
    # grupo "aparezca" en ese aula y bloque en cada uno de los días definidos por el patrón.
    # Impacto: Mantiene la coherencia de la asignación del patrón a lo largo de la semana.
    for i in I:
        for j in J:
            for b in B:
                for d in TODOS_LOS_DIAS_VALIDOS:
                    prob += x_slot[i][j][(d, b)] == pulp.lpSum(
                        x_assign_full_pattern[i][j][b][p_val] for p_val in PATRONES
                        if d in DIAS_POR_PATRON[p_val]
                    ), f"Derive_x_slot_{i}_{j}_{d}_{b}"

    # Restricción 3: Una Asignación por Aula y Horario
    # Descripción: Garantiza que en una misma aula y en una misma franja de tiempo (día y bloque),
    # solo pueda haber un máximo de UN grupo asignado.
    # Impacto: Evita colisiones y asegura que las aulas no se sobrepongan en uso.
    for j in J:
        for (d, b) in T_todos_los_slots:
            prob += pulp.lpSum(x_slot[i][j][(d, b)] for i in I) <= 1, \
                    f"Una_Asignacion_Por_Aula_Slot_{j}_{d}_{b}"

    # Restricción 4: Capacidad del Aula
    # Descripción: Un grupo solo puede ser asignado a un aula si el número de estudiantes
    # del grupo es menor o igual a la capacidad máxima de esa aula.
    # Impacto: Asegura que las aulas no estén superpobladas y que todos los estudiantes quepan cómodamente.
    for i in I:
        for j in J:
            for (d, b) in T_todos_los_slots:
                prob += x_slot[i][j][(d, b)] * grupos[i]["cantidad"] <= aulas[j]["capacidad"], \
                        f"Capacidad_Aula_{i}_{j}_{d}_{b}"

    # Restricción 5: Penalización por Subutilización de Espacio
    # Descripción: Esta regla se activa cuando un aula asignada a un grupo tiene mucho espacio vacío,
    # más allá de lo que consideramos "tolerable" (definido por el parámetro 'delta').
    # Si el espacio libre (capacidad del aula - estudiantes del grupo) supera el umbral 'delta'
    # (como un porcentaje de la capacidad del aula), se genera una "penalización" que la función
    # objetivo intentará minimizar. Esto promueve un uso más eficiente de las aulas.
    # Impacto: Fomenta la asignación de grupos a aulas de tamaño más apropiado, reduciendo el desperdicio de espacio.
    for i in I:
        for j in J:
            for (d, b) in T_todos_los_slots:
                capacidad_aula = aulas[j]["capacidad"]
                cantidad_estudiantes = grupos[i]["cantidad"]
                prob += U[i][j][(d, b)] >= x_slot[i][j][(d, b)] * (
                    capacidad_aula - cantidad_estudiantes - (delta * capacidad_aula)
                ), f"Penalizacion_Subutilizacion_{i}_{j}_{d}_{b}"

    # --- Paso 5: Ejecución del Solucionador (El que hace el "cálculo") ---
    # Aquí le pedimos a la librería PuLP que utilice un programa externo (CBC o GLPK)
    # para encontrar la mejor solución que cumpla todas las reglas y maximice nuestro objetivo.
    try:
        solver = pulp.COIN_CMD(msg=0) # Intentamos usar el solucionador CBC.
        prob.solve(solver) # Resolvemos el problema.
    except Exception as e:
        print(f"Error: se produjo un error al intentar usar COIN_CMD: {e}. Intentando con otro solucionador disponible.")
        try:
            solver = pulp.GLPK_CMD(msg=0) # Si CBC falla, intentamos con GLPK.
            prob.solve(solver)
        except Exception as e_glpk:
            print(f"Error: se produjo un error al intentar usar GLPK_CMD: {e_glpk}. Intentando con otro solucionador disponible.")
            # Si ambos fallan, devolvemos un mensaje de error claro.
            return {"error": "Debido a un error en la configuración del solucionador, no se pudo resolver el problema de optimización. Por favor, verifica la configuración del entorno o intenta con otro solucionador."}

    # --- Paso 6: Procesamiento de la Solución Obtenida ---
    # Una vez que el solucionador ha terminado, interpretamos los resultados para ver
    # cómo se asignaron realmente los grupos a las aulas y horarios.
    asignacion = []
    if prob.status == pulp.LpStatusOptimal: # Si el solucionador encontró una solución óptima...
        for i in I:
            for j in J:
                for b in B:
                    for p in PATRONES:
                        # Si esta combinación de grupo, aula, bloque y patrón fue elegida por el optimizador:
                        if pulp.value(x_assign_full_pattern[i][j][b][p]) == 1:
                            dias_asignados = DIAS_POR_PATRON[p] # Obtenemos los días de ese patrón.
                            for dia_actual in dias_asignados: # Para cada día en el patrón...
                                # Añadimos esta asignación a nuestra lista de resultados.
                                asignacion.append({
                                    "grupo": grupos[i]["nombre"],
                                    "materia": grupos[i]["materia"],
                                    "aula": aulas[j]["nombre"],
                                    "piso": aulas[j]["piso"],
                                    "dia": dia_actual,
                                    "bloque": b,
                                    "patron_asignado": p, # Indicamos el patrón de días usado.
                                    "capacidad_aula": aulas[j]["capacidad"],
                                    "estudiantes_grupo": grupos[i]["cantidad"],
                                    "subutilizacion_penalizable": pulp.value(U[i][j][(dia_actual, b)])
                                })
    else: # Si el solucionador no encontró una solución óptima (por ejemplo, es imposible con las reglas dadas)
        print(f"El problema no tiene una solución óptima. Estado del solucionador: {pulp.LpStatus[prob.status]}")
        
        # Análisis más detallado del problema
        error_msg = f"El problema de optimización no tiene una solución viable. Estado: {pulp.LpStatus[prob.status]}\n\n"
        
        if prob.status == pulp.LpStatusInfeasible:
            error_msg += "Posibles causas:\n"
            error_msg += "1. Capacidad insuficiente: No hay suficientes aulas o capacidad para todos los grupos\n"
            error_msg += "2. Horarios insuficientes: No hay suficientes bloques de tiempo disponibles\n"
            error_msg += "3. Restricciones muy estrictas: Los parámetros delta y lambda pueden ser muy restrictivos\n\n"
            
            # Información adicional para debugging
            total_estudiantes = sum(grupo["cantidad"] for grupo in grupos)
            total_capacidad_por_bloque = sum(aula["capacidad"] for aula in aulas)
            bloques_count = len(bloques_disponibles)
            patrones_count = 2  # LMV y MJ
            
            error_msg += f"Estadísticas del problema:\n"
            error_msg += f"- Total de estudiantes: {total_estudiantes}\n"
            error_msg += f"- Capacidad total por bloque: {total_capacidad_por_bloque}\n"
            error_msg += f"- Bloques disponibles: {bloques_count}\n"
            error_msg += f"- Patrones de días: {patrones_count} (LMV, MJ)\n"
            error_msg += f"- Capacidad teórica total: {total_capacidad_por_bloque * bloques_count * patrones_count}\n\n"
            
            if total_estudiantes > total_capacidad_por_bloque:
                error_msg += "⚠️ PROBLEMA DETECTADO: Hay más estudiantes que capacidad disponible por bloque de tiempo.\n"
                error_msg += "Solución: Añadir más aulas o aumentar la capacidad de las existentes.\n"
        
        return {"error": error_msg}

    # --- Paso 7: Generación del Resumen y Análisis con Inteligencia Artificial ---
    # Una vez que tenemos las asignaciones, utilizamos OpenAI para generar un resumen
    # comprensible y profesional de todo el proceso y los resultados.
    resumen_generado = "No se pudo generar un resumen. La clave de la API de OpenAI no está configurada o hubo un error."
    if client: # Solo intentamos generar el resumen si la conexión con OpenAI está activa.
        try:
            # Preparamos los datos de entrada en un formato que la IA pueda entender fácilmente.
            input_data_str = "Datos de entrada:\n"
            input_data_str += f"- Aulas: {', '.join([f'{a['nombre']} (Capacidad: {a['capacidad']})' for a in aulas])}\n"
            input_data_str += f"- Grupos: {', '.join([f'{g['nombre']} (Estudiantes: {g['cantidad']})' for g in grupos])}\n"
            input_data_str += f"- Bloques de Horario Disponibles: {', '.join(bloques_disponibles)}\n"
            input_data_str += f"- Umbral de Subutilización (delta): {delta}\n"
            input_data_str += f"- Factor de Penalización (lambda): {lambda_}\n\n"

            # Preparamos los resultados de la optimización de manera legible para la IA.
            result_data_str = "Resultados de la optimización (asignaciones):\n"
            if not asignacion: # Si no se encontraron asignaciones...
                result_data_str += "No se encontraron asignaciones. Esto podría indicar que no hay una solución viable con las restricciones dadas.\n"
            else: # Si hay asignaciones, las listamos.
                for entry in asignacion:
                    result_data_str += (
                        f"- Grupo '{entry['grupo']}' (Materia: {entry['materia']}) asignado al aula "
                        f"'{entry['aula']}' (Piso: {entry['piso']}) el '{entry['dia']}' "
                        f"durante el bloque '{entry['bloque']}' (Patrón: {entry['patron_asignado']}). "
                        f"Estudiantes: {entry['estudiantes_grupo']}/{entry['capacidad_aula']} capacidad. "
                        f"Subutilización penalizable: {entry['subutilizacion_penalizable']:.2f}.\n"
                    )

            # Creamos el mensaje completo que le enviaremos a la IA.
            # Le pedimos que actúe como un experto y analice la información para darnos un resumen.
            prompt_text = (
                "Como experto en optimización y asignación de recursos, por favor analiza los siguientes "
                "datos de entrada y los resultados de la asignación de aulas. Proporciona un resumen conciso "
                "y amigable, destacando la eficiencia de las asignaciones, cualquier subutilización notable "
                "y sugerencias generales si fuera posible.\n\n"
                f"{input_data_str}"
                f"{result_data_str}"
            )

            # Hacemos la llamada a la API de OpenAI.
            # Usamos el modelo "gpt-4o" (o "gemini-2.0-flash" si lo prefieres, o el que mejor te funcione).
            # messages: Son las instrucciones y el texto que le damos a la IA.
            # max_tokens: Limita la longitud del resumen que genera.
            # temperature: Controla la creatividad del resumen (0.0 es más directo, 1.0 es más imaginativo).
            chat_completion = client.chat.completions.create(
                model="gpt-4o", # O "gemini-2.0-flash"
                messages=[
                    {"role": "system", "content": "Eres un analista experto en optimización de asignación de aulas y recursos."},
                    {"role": "user", "content": prompt_text}
                ],
                max_tokens=350,
                temperature=0.7
            )
            # Obtenemos el texto del resumen generado por la IA.
            resumen_generado = chat_completion.choices[0].message.content

        except openai.APIConnectionError as e:
            print(f"Error de conexión a la API de OpenAI: {e}")
            resumen_generado = "Error de conexión al servicio de IA para generar el resumen. Verifica tu conexión a Internet."
        except openai.APIStatusError as e:
            print(f"Error de estado de la API de OpenAI: {e}")
            resumen_generado = "Error de estado del servicio de IA al generar el resumen. Verifica tu clave de API o los límites de uso de la API."
        except Exception as e:
            print(f"Error inesperado al generar el resumen de IA: {e}")
            resumen_generado = "No se pudo generar un resumen debido a un error interno. Por favor, intenta nuevamente más tarde."

    # Finalmente, devolvemos tanto las asignaciones encontradas como el resumen generado por la IA.
    return {
        "asignacion": asignacion,
        "resumen_generado": resumen_generado
    }
