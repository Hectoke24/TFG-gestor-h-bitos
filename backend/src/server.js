const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const habitRoutes = require("./routes/habitRoutes");
const routineRoutes = require("./routes/routineRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use("/habits", habitRoutes);
app.use("/routines", routineRoutes);

pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("Error conectando con PostgreSQL:", err);
  } else {
    console.log("Conexión a PostgreSQL correcta");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});