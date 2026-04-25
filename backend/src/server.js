const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const habitRoutes = require("./routes/habitRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use("/habits", habitRoutes);

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Error conectando con PostgreSQL:", err);
  } else {
    console.log("Conexión a PostgreSQL correcta");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

