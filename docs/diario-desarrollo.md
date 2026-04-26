### Problemas encontrados
- 11/04/2026
    - Error al crear el fornted por escribir mal el comando de Vite.
    - Error con 'package.json' vacion en el backend.
    - Error de GitHub relacionado con privacidad del correo al hacer push.

- 12/04/2026 problema pendiente:
    - La actualización del estado de los hábitos no se refleja automáticamente en la interfaz.
    - Aunque el backend cambia correctamente el valor del hábito, en el frontend sigue siendo necesario recargar el navegador para ver el cambio.
    - Durante el desarrollo también aparecieron errores puntuales al añadir la función de eliminar hábitos y al reorganizar parte del código en 'App.jsx'.

- 25/04/2026
    - Fue necesario instalar y configurar PostgreSQL en el entorno local para integrar la base de datos en el proyecto.
    - Preparar correctamente la conexión entre el backend y PostgreSQL, incluyendo la creación de la base de datos y la tabla de hábitos.
    - Sustituir el almacenamiento temporal en memoria por consultas reales a base de datos sin romper las funcionalidades que ya funcionaban.
    - Reorganizar parte del backend para dejar la aplicación preparada para trabajar con persistencia real.
    - Adaptar la aplicación para manejar varias pantallas con navegación entre vistas.
    - La parte visual de la aplicación todavía requería mejoras para que la navegación, la pantalla principal y la pantalla de estadísticas tuvieran un aspecto más claro y uniforme.

### Soluciones aplicadas
- 11/04/2026
    - Correccion del comando para crear Vite.
    - Regeneracion del archivo 'package.json' del backend.
    - Configuracion del correo 'noreply' de GitHub para poder realizar el push.

- 12/04/2026
    - Se implementó la funcionalidad para marcar hábitos como completados o pendientes.
    - Se implementó la funcionalidad para eliminar hábitos.
    - Se revisó y corrigió la lógica del backend en 'server.js'.
    - Se revisó y corrigió la lógica del frontend en 'App.jsx'.
    - Se hicieron pruebas adicionales en 'main.jsx' para intentar detectar el origen del problema de actualización automática.
    - Se comprobó que la función de eliminar hábitos funciona correctamente y que el backend responde bien a las peticiones.

- 25/04/2026
    - Se instaló y configuró PostgreSQL en el equipo.
    - Se creó la base de datos del proyecto y la tabla `habits`.
    - Se conectó el backend con PostgreSQL mediante el paquete `pg`.
    - Se sustituyó el uso de datos en memoria por consultas reales a la base de datos.
    - Se movieron los datos sensibles de conexión al archivo `.env`.
    - Se añadieron varias pantallas con React Router.
    - Se creó una pantalla de estadísticas con gráficos.
    - Se mejoró la navegación y el diseño visual general de la aplicación.

- 26/04/2026
    - Se ha creado una tabla de historial diario para los hábitos.
    - Se ha comenzado a guardar el progreso diario en la base de datos.
    - Se ha añadido una ruta para estadísticas diarias.
    - Se ha añadido una nueva sección de rutinas.
    - Se han creado tablas para rutinas y ejercicios.
    - Se ha añadido una ruta backend para obtener rutinas desde PostgreSQL.
    - Se ha conectado la sección de rutinas con la base de datos.



### Estado actual
- 11/04/2026
    - El fronted funcionando correctamente.
    - El backend funcionando correctamente.
    - La aplicacion muestra hábitos y permite añadir nuevos hábitos.

- 12/04/2026
    - La aplicación muestra hábitos correctamente.
    - La aplicación permite añadir nuevos hábitos.
    - La aplicación permite eliminar hábitos.
    - El cambio de estado de los hábitos funciona en el backend.
    - Sigue pendiente corregir la actualización automática del estado en el frontend.

- 25/04/2026
    - La aplicación ya utiliza PostgreSQL como base de datos y los hábitos se guardan de forma persistente.
    - El sistema permite mostrar, añadir, editar, completar y eliminar hábitos.
    - La aplicación cuenta con navegación entre varias pantallas.
    - Existe una pantalla de estadísticas con gráficos y resumen visual de los datos.
    - La interfaz tiene un aspecto más limpio, ordenado y presentable.

- 26/04/2026
    - La aplicación ya permite gestionar hábitos con persistencia real.
    - Existe una pantalla de estadísticas con gráficos y progreso diario.
    - Existe una pantalla de rutinas conectada al backend y a PostgreSQL.

### Proximos pasos
- 11/04/2026 para el proximo dia:
    - Marcar hábitos como completados.
    - Eliminar hábitos.
    - Guardar datos en base de datos.
    - Mejorar el diseño visual.

- 12/04/2026
    - Resolver el problema de actualización automática del estado de los hábitos en la interfaz.
    - Revisar con más detalle la comunicación entre frontend y backend.
    - Continuar con la organización del código en componentes.
    - Seguir avanzando en la estructura general de la aplicación.

- 25/04/2026
    - Seguir mejorando el diseño visual general de la aplicación.
    - Ampliar la parte de estadísticas con datos más completos y útiles.
    - Preparar la estructura necesaria para mostrar progreso por días o semanas.
    - Revisar y organizar mejor el backend y el frontend.
    - Continuar avanzando en la documentación del TFG y en la preparación de la versión final.

- 26/04/2026
    - Mejorar la pantalla de rutinas y añadir más contenido.
    - Seguir ampliando las estadísticas con datos semanales.
    - Mejorar la estructura interna del backend para separarlo mejor en rutas, controladores y acceso a datos.
    - Revisar y seguir mejorando el diseño general de la aplicación.
    - Preparar la unión de la rama `feature/base-datos` con `main` cuando esta fase quede cerrada.