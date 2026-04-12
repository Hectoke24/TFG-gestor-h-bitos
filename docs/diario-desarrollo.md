### Problemas encontrados
- 11/04/2026
    - Error al crear el fornted por escribir mal el comando de Vite.
    - Error con 'package.json' vacion en el backend.
    - Error de GitHub relacionado con privacidad del correo al hacer push.

- 12/04/2026 problema pendiente:
    - La actualización del estado de los hábitos no se refleja automáticamente en la interfaz.
    - Aunque el backend cambia correctamente el valor del hábito, en el frontend sigue siendo necesario recargar el navegador para ver el cambio.
    - Durante el desarrollo también aparecieron errores puntuales al añadir la función de eliminar hábitos y al reorganizar parte del código en 'App.jsx'.

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