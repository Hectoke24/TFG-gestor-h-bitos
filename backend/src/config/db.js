// carga las variables de entorno definidas en el archivo .env
require("dotenv").config();

// Importa el módulo Pool de la biblioteca pg (libreria utilizada para conectar Node.js) para manejar conexiones a PostgreSQL
const { Pool } = require("pg");

// Crea una nueva instancia de Pool utilizando las variables de entorno para configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;