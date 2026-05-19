{/* Importación de dependencias y configuración del servidor Express*/}

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const habitRoutes = require("./routes/habitRoutes");
const routineRoutes = require("./routes/routineRoutes");

{/* Configuración del servidor Express y se define el puerto de escucha */}
const app = express();
const PORT = 3000;

{/* Se configuran funciones intermedias que se ejecutan antes de las rutas para permitir solicitudes */}
app.use(cors());
app.use(express.json());

{/* Define una ruta raíz para verificar que el backend está funcionando correctamente */}
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

{/* Se conectan las rutas de hábitos y rutinas al servidor Express */}
app.use("/habits", habitRoutes);
app.use("/routines", routineRoutes);

{/* Comprueba si el backend puede conectarse a la base de datos PostgreSQL ejecutando */}
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("Error conectando con PostgreSQL:", err);
  } else {
    console.log("Conexión a PostgreSQL correcta");
  }
});

{/* Arranca el servidor backend y lo deja escuchando 3000 */}
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
