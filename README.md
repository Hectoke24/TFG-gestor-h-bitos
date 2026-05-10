# TFG - Gestor de Hábitos

Proyecto de Trabajo de Fin de Grado orientado al desarrollo de una aplicación web para la gestión de hábitos diarios, el seguimiento del progreso personal y la consulta de estadísticas y rutinas.

## Descripción

La aplicación permite al usuario crear, visualizar, editar y gestionar hábitos personales de forma sencilla.  
Además, incorpora una parte de estadísticas para consultar el progreso diario y semanal, así como una sección de rutinas de ejercicios conectada a la base de datos.

El objetivo principal del proyecto es ofrecer una herramienta intuitiva que ayude a mejorar la organización personal, la constancia y el seguimiento de hábitos saludables.

## Objetivo del proyecto

Desarrollar una aplicación web intuitiva y funcional que permita al usuario:

- gestionar hábitos diarios
- registrar el progreso de cada día
- consultar estadísticas visuales
- organizar hábitos por categorías
- utilizar rutinas como apoyo a hábitos de salud y ejercicio

## Estado actual

El proyecto se encuentra en una fase muy avanzada de desarrollo y cuenta ya con una base funcional sólida.

Hasta el momento se ha realizado:

- creación de la estructura general del proyecto
- configuración del frontend con React y Vite
- configuración del backend con Node.js y Express
- conexión entre frontend y backend
- integración de PostgreSQL como base de datos
- gestión completa de hábitos
- sistema de categorías para hábitos
- seguimiento diario mediante historial
- estadísticas con gráficos
- cálculo de racha actual y racha máxima
- sección de rutinas conectada a la base de datos
- navegación entre pantallas
- mejora visual general de la aplicación

## Funcionalidades actuales

Actualmente, el proyecto permite:

- mostrar una lista de hábitos
- añadir nuevos hábitos
- editar hábitos
- eliminar hábitos
- clasificar hábitos por categoría
- filtrar hábitos por categoría
- marcar hábitos como completados o pendientes
- gestionar hábitos diarios, reiniciándose de forma natural cada nuevo día
- guardar hábitos de forma persistente en PostgreSQL
- registrar historial diario de hábitos
- visualizar estadísticas generales
- visualizar progreso diario
- visualizar progreso semanal
- visualizar racha actual
- visualizar racha máxima
- visualizar hábitos por categoría
- navegar entre varias pantallas
- consultar una sección de rutinas
- filtrar rutinas por grupo muscular
- obtener rutinas desde la base de datos

## Estructura del proyecto

tfg-gestor-habitos/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── docs/
│   ├── diario-desarrollo.md
│   ├── estructura-proyecto.md
│   └── ideas.md
│
├── .gitignore
└── README.md

## Carpetas principales

## frontend/
Contiene la interfaz de usuario de la aplicación, desarrollada con React.

## backend/
Contiene el servidor, las rutas, la conexión con la base de datos y la lógica principal de la aplicación.

## docs/
Contiene la documentación de apoyo del TFG, como el diario de desarrollo, la estructura del proyecto y las ideas de mejora futura.

## Tecnologías utilizadas
## Frontend
- React
- Vite
- React Router
- Recharts
- React Icons
- CSS

## Backend
- Node.js
- Express
- PostgreSQL
- dotenv
- pg

## Base de datos

La aplicación utiliza PostgreSQL como sistema de base de datos. Las tablas principales del proyecto son:

- habits → almacena los hábitos
- habit_logs → almacena el historial diario de hábitos
- routines → almacena las rutinas
- routine_exercises → almacena los ejercicios de cada rutina

La conexión con la base de datos se realiza mediante variables de entorno definidas en un archivo .env.

## Ejecución del proyecto
1. Instalar dependencias del frontend
Desde la carpeta frontend:

- npm install
- npm run dev

2. Instalar dependencias del backend
Desde la carpeta backend:

- npm install
- npm run dev

3. Configurar la base de datos
Es necesario disponer de PostgreSQL instalado y crear la base de datos correspondiente para el proyecto.
Además, dentro de backend/ debe existir un archivo .env con la configuración de conexión, por ejemplo:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=gestor_habitos
DB_PASSWORD=tu_password
DB_PORT=5432

## Mejoras futuras

Como posibles mejoras futuras del proyecto se plantean:

- Añadir un sistema de búsqueda de hábitos por nombre
- Incorporar más estadísticas por categoría
- Añadir más rutinas y organizarlas por nivel, duración o dificultad
- Mejorar la sección de rutinas con imágenes o iconos específicos
- Incluir mensajes visuales de confirmación
- Mejorar todavía más la adaptación responsive
- Reorganizar el backend separando controladores y acceso a datos
- Desarrollar una futura versión móvil reutilizando el backend actual
- Añadir un sistema de cuentas de usuario con registro e inicio de sesión
- Permitir que cada usuario tenga sus propios hábitos, estadísticas y rutinas
- Incorporar rankings entre usuarios
- Añadir logros o recompensas por constancia

## Estado del repositorio

Este README recoge ya una versión más completa del estado actual del proyecto y seguirá actualizándose conforme avance el desarrollo del TFG y su documentación final.

# Autor

Proyecto realizado por Héctor Galán como parte de su Trabajo de Fin de Grado.