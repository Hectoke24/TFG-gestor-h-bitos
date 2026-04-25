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