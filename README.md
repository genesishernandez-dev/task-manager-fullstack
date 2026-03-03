# Gestor de Tareas - CRUD Full Stack

Aplicación fullstack desarrollada con Django REST Framework (backend) y React (frontend) que permite gestionar tareas personales mediante una API REST.

---

## Funcionalidades

- Crear tareas
- Listar tareas
- Actualizar tareas
- Eliminar tareas
- Filtrar por estado
- Buscar por título
- Actualización automática sin recargar la página

---

## Tecnologías utilizadas

### Backend
- Django
- Django REST Framework
- SQLite
- django-cors-headers

### Frontend
- React
- Axios
- Hooks (useState, useEffect)
- CSS personalizado

---

## Estructura del proyecto

backend/
frontend/

---

## Cómo ejecutar el proyecto localmente

### Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd task-manager-fullstack

---

### Ejecutar Backend

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend disponible en:
http://127.0.0.1:8000/

---

### Ejecutar Frontend

En otra terminal:

cd frontend
npm install
npm start

Frontend disponible en:
http://localhost:3000/

---

## Características técnicas

- API REST con endpoints GET, POST, PUT y DELETE
- Uso de Serializers y ViewSets en Django REST Framework
- Manejo de estado con Hooks en React
- Consumo de API con Axios
- Integración completa entre frontend y backend
- Interfaz moderna y responsive

---

## 👨‍💻 Autor

Proyecto desarrollado como prueba técnica para demostrar conocimientos en desarrollo fullstack con Django y React.