# Estructura del proyecto

## [11/04/2026]
El proyecto se divide en tres partes principales:

### Fronted
Contiene la interfaz de usuario desarrollada con React.

### Backend
Contiene el servidor desarrollado con Node.js y Express, encargado de gestionar la lógica y las rutas de la aplicación.

### Docs
Contiene la documentacion de apoyo del TFG, como el diario de desarrollo, ideas, requisitos y explicación de la estructura.

---

## [12/04/2026]
### Frontend
Actualmente contiene:
- formulario para añadir hábitos
- listado de hábitos
- botones para cambiar el estado de un hábito
- botón para eliminar hábitos

Archivo principal actual:
- 'frontend/src/App.jsx'

### Backend
Actualmente contiene:
- ruta 'GET /habits' para obtener la lista de hábitos
- ruta 'POST /habits' para añadir nuevos hábitos
- ruta 'PUT /habits/:id' para cambiar el estado de un hábito
- ruta 'DELETE /habits/:id' para eliminar un hábito

Archivo principal actual:
- 'backend/src/server.js'

### Docs
Actualmente contiene:
- 'diario-desarrollo.md'
- 'estructura-proyecto.md'
- 'ideas.md'

### Estado actual del proyecto
En este momento el proyecto ya cuenta con una base funcional mínima.

Actualmente permite:
- mostrar hábitos
- añadir hábitos
- eliminar hábitos
- cambiar el estado de los hábitos en el backend

### Pendiente de resolver
- corregir la actualización automática del estado de los hábitos en el frontend para que el cambio se refleje al instante en la interfaz

---

## [25/04/2026]
### Frontend
Actualmente contiene:
- formulario para añadir hábitos
- listado de hábitos
- botones para cambiar el estado de un hábito
- botón para eliminar hábitos
- opción para editar hábitos
- navegación entre pantallas con React Router
- pantalla principal de hábitos
- pantalla de estadísticas con resumen visual
- gráfico de barras
- gráfico circular

Archivos principales actuales:
- 'frontend/src/App.jsx'
- 'frontend/src/pages/Home.jsx'
- 'frontend/src/pages/Stats.jsx'
- 'frontend/src/components/Navbar.jsx'

### Backend
Actualmente contiene:
- conexión con PostgreSQL
- configuración de variables de entorno con '.env'
- ruta 'GET /habits' para obtener la lista de hábitos
- ruta 'POST /habits' para añadir nuevos hábitos
- ruta 'PUT /habits/:id' para cambiar el estado de un hábito
- ruta 'PUT /habits/:id/edit' para editar un hábito
- ruta 'DELETE /habits/:id' para eliminar un hábito

Archivos principales actuales:
- 'backend/src/server.js'
- 'backend/src/routes/habitRoutes.js'
- 'backend/src/config/db.js'

### Docs
Actualmente contiene:
- 'diario-desarrollo.md'
- 'estructura-proyecto.md'
- 'ideas.md'

### Estado actual del proyecto
En este momento el proyecto ya cuenta con una base funcional más completa.

Actualmente permite:
- mostrar hábitos
- añadir hábitos
- editar hábitos
- eliminar hábitos
- cambiar el estado de los hábitos
- guardar hábitos de forma persistente en PostgreSQL
- navegar entre varias pantallas
- visualizar estadísticas con gráficos

### Pendiente de resolver
- seguir mejorando el diseño general de la aplicación
- ampliar la parte de estadísticas con datos más completos
- preparar una estructura de seguimiento temporal para mostrar progreso por días o semanas
- seguir organizando mejor el código del frontend y del backend

## [26/04/2026]
### Frontend
Actualmente contiene:
- formulario para añadir hábitos
- listado de hábitos
- botones para cambiar el estado de un hábito
- botón para eliminar hábitos
- opción para editar hábitos
- navegación entre pantallas con React Router
- pantalla principal de hábitos
- pantalla de estadísticas con resumen visual
- gráfico de barras
- gráfico circular
- gráfico de progreso diario
- nueva pantalla de rutinas
- filtro de rutinas por grupo muscular
- mejora visual de la sección de rutinas

Archivos principales actuales:
- 'frontend/src/App.jsx'
- 'frontend/src/pages/Home.jsx'
- 'frontend/src/pages/Stats.jsx'
- 'frontend/src/pages/Rutinas.jsx'
- 'frontend/src/components/Navbar.jsx'
- 'frontend/src/App.css'

### Backend
Actualmente contiene:
- conexión con PostgreSQL
- configuración de variables de entorno con '.env'
- ruta 'GET /habits' para obtener la lista de hábitos
- ruta 'POST /habits' para añadir nuevos hábitos
- ruta 'PUT /habits/:id' para cambiar el estado de un hábito
- ruta 'PUT /habits/:id/edit' para editar un hábito
- ruta 'DELETE /habits/:id' para eliminar un hábito
- tabla 'habit_logs' para guardar historial diario de hábitos
- ruta 'GET /habits/stats/daily' para obtener estadísticas diarias
- tabla 'routines' para almacenar rutinas
- tabla 'routine_exercises' para almacenar ejercicios de cada rutina
- ruta 'GET /routines' para obtener las rutinas desde PostgreSQL

Archivos principales actuales:
- 'backend/src/server.js'
- 'backend/src/routes/habitRoutes.js'
- 'backend/src/routes/routineRoutes.js'
- 'backend/src/config/db.js'

### Docs
Actualmente contiene:
- 'diario-desarrollo.md'
- 'estructura-proyecto.md'
- 'ideas.md'

### Estado actual del proyecto
En este momento el proyecto ya cuenta con una base funcional bastante más completa.

Actualmente permite:
- mostrar hábitos
- añadir hábitos
- editar hábitos
- eliminar hábitos
- cambiar el estado de los hábitos
- guardar hábitos de forma persistente en PostgreSQL
- registrar historial diario de hábitos
- navegar entre varias pantallas
- visualizar estadísticas con gráficos
- mostrar progreso diario
- visualizar una sección de rutinas
- filtrar rutinas por grupo muscular
- obtener rutinas desde la base de datos

### Pendiente de resolver
- seguir mejorando el diseño general de la aplicación
- ampliar la parte de estadísticas con datos semanales y más completos
- seguir mejorando la sección de rutinas
- organizar mejor el backend separando más responsabilidades
- revisar la adaptación responsive de la interfaz

## [01/05/2026]
### Frontend
Actualmente contiene:
- formulario para añadir hábitos
- listado de hábitos
- botones para cambiar el estado de un hábito
- botón para eliminar hábitos
- opción para editar hábitos
- navegación entre pantallas con React Router
- pantalla principal de hábitos
- pantalla de estadísticas con resumen visual
- gráfico de barras
- gráfico circular
- gráfico de progreso diario
- gráfico de progreso semanal
- indicador de racha actual
- indicador de racha máxima
- nueva pantalla de rutinas
- filtro de rutinas por grupo muscular
- mejora visual de la sección de rutinas
- conexión de la pantalla de rutinas con el backend

Archivos principales actuales:
- 'frontend/src/App.jsx'
- 'frontend/src/pages/Home.jsx'
- 'frontend/src/pages/Stats.jsx'
- 'frontend/src/pages/Rutinas.jsx'
- 'frontend/src/components/Navbar.jsx'
- 'frontend/src/App.css'

### Backend
Actualmente contiene:
- conexión con PostgreSQL
- configuración de variables de entorno con '.env'
- ruta 'GET /habits' para obtener la lista de hábitos
- ruta 'POST /habits' para añadir nuevos hábitos
- ruta 'PUT /habits/:id' para cambiar el estado de un hábito
- ruta 'PUT /habits/:id/edit' para editar un hábito
- ruta 'DELETE /habits/:id' para eliminar un hábito
- tabla 'habit_logs' para guardar historial diario de hábitos
- actualización de 'habit_logs' al cambiar el estado de un hábito
- ruta 'GET /habits/stats/daily' para obtener estadísticas diarias
- ruta 'GET /habits/stats/weekly' para obtener estadísticas semanales
- ruta 'GET /habits/stats/streak' para obtener la racha actual
- ruta 'GET /habits/stats/max-streak' para obtener la racha máxima
- tabla 'routines' para almacenar rutinas
- tabla 'routine_exercises' para almacenar ejercicios de cada rutina
- ruta 'GET /routines' para obtener las rutinas desde PostgreSQL

Archivos principales actuales:
- 'backend/src/server.js'
- 'backend/src/routes/habitRoutes.js'
- 'backend/src/routes/routineRoutes.js'
- 'backend/src/config/db.js'

### Docs
Actualmente contiene:
- 'diario-desarrollo.md'
- 'estructura-proyecto.md'
- 'ideas.md'

### Estado actual del proyecto
En este momento el proyecto ya cuenta con una base funcional todavía más completa.

Actualmente permite:
- mostrar hábitos
- añadir hábitos
- editar hábitos
- eliminar hábitos
- cambiar el estado de los hábitos
- guardar hábitos de forma persistente en PostgreSQL
- registrar historial diario de hábitos
- navegar entre varias pantallas
- visualizar estadísticas con gráficos
- mostrar progreso diario
- mostrar progreso semanal
- visualizar racha actual
- visualizar racha máxima
- visualizar una sección de rutinas
- filtrar rutinas por grupo muscular
- obtener rutinas desde la base de datos

### Pendiente de resolver
- seguir mejorando el diseño general de la aplicación
- ampliar todavía más la parte de estadísticas con información más detallada
- seguir mejorando la sección de rutinas
- organizar mejor el backend separando más responsabilidades
- revisar la adaptación responsive de la interfaz