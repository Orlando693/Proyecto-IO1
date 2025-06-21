import pulp

def optimizar_asignacion(aulas, grupos, horarios, delta, lambda_):

    prob = pulp.LpProblem("Asignacion_Aulas", pulp.LpMaximize)

    I = range(len(grupos))
    J = range(len(aulas))
    T = [(h["dia"], h["bloque"]) for h in horarios]  # Ahora T es una lista de tuplas (dia, bloque)

    # Variables de decisión
    x = pulp.LpVariable.dicts("x", (I, J, T), cat="Binary")
    U = pulp.LpVariable.dicts("U", (I, J, T), lowBound=0, cat="Continuous")

    # Función objetivo
    prob += (
        pulp.lpSum(x[i][j][t] * grupos[i]["cantidad"] for i in I for j in J for t in T)
        - lambda_ * pulp.lpSum(U[i][j][t] for i in I for j in J for t in T)
    ), "ObjetivoMaximizarAsignacion"

    # Restricciones:

    # Cada grupo asignado exactamente a un aula en un bloque único
    for i in I:
        prob += pulp.lpSum(x[i][j][t] for j in J for t in T) == 1

    # Un aula no puede tener más de un grupo al mismo tiempo (misma aula, mismo bloque horario)
    for j in J:
        for t in T:
            prob += pulp.lpSum(x[i][j][t] for i in I) <= 1

    # No sobrepasar la capacidad del aula
    for i in I:
        for j in J:
            for t in T:
                prob += x[i][j][t] * grupos[i]["cantidad"] <= aulas[j]["capacidad"]

    # Penalización por subutilización
    for i in I:
        for j in J:
            for t in T:
                capacidad = aulas[j]["capacidad"]
                estudiantes = grupos[i]["cantidad"]
                prob += U[i][j][t] >= x[i][j][t] * (capacidad - estudiantes - delta * capacidad)

    # Ejecutar el solver externo CBC
    solver = pulp.COIN_CMD(path="C:/Solvers/bin/cbc.exe")
    prob.solve(solver)

    # Procesar la solución
    asignacion = []
    for i in I:
        for j in J:
            for t in T:
                if x[i][j][t].value() == 1:
                    dia, bloque = t
                    asignacion.append({
                        "grupo": grupos[i]["nombre"],
                        "materia": grupos[i]["materia"],
                        "aula": aulas[j]["nombre"],
                        "piso": aulas[j]["piso"],
                        "dia": dia,
                        "bloque": bloque
                    })

    return asignacion
