# Proyecto IO1 - Optimización de Asignación de Aulas

Este proyecto es un sistema completo (frontend + backend) que resuelve la asignación óptima de grupos a aulas considerando horarios, penalización por subutilización, y un modelo MILP (Programación Lineal Entera Mixta).

## 📁 Estructura del Proyecto

PROYECTO_IO1_F/
├── backendIO1/
├── frontendIO1/
└── README.md


## 🚀 Tecnologías Utilizadas

- Frontend: React + Tailwind CSS
- Backend: FastAPI + Pulp (solver CBC)
- Solver: CBC (Coin-OR Binary)

## 🛠️ Requisitos

### Backend
- Python 3.10+
- Instalar dependencias con:
  ```bash
  pip install -r requirements.txt

#### ✅ Dependencias

- Python 3.10 o superior
- Instalar dependencias con:
cd backendIO1
python -m venv venv
venv\Scripts\activate  # en Windows

## Lvenatar Backend
- uvicorn main:app --reload

pip install -r requirements.txt

### Si no tienes requirements.txt, puedes usar:

bash
pip install fastapi uvicorn pulp python-multipart

#### ✅ Ejecutar el servidor
bash
uvicorn main:app --reload

### Frontend
### ✅ Requisitos
Node.js 18 o superior

### ✅ Instalar dependencias y ejecutar
bash
cd frontendIO1
npm install
npm run dev

⚙️ Instalación del Solver CBC
El backend utiliza cbc.exe para resolver el modelo MILP. Asegúrate de:

Descargar CBC desde:
👉 https://github.com/coin-or/Cbc/releases
(ejemplo: Cbc-releases.2.10.12-w64-msvc17-md.zip)

Extraer y colocar cbc.exe en:
C:\Solvers\bin\cbc.exe

Agregar C:\Solvers\bin al PATH del sistema para que FastAPI pueda ejecutarlo.