// Se importa Express para crear rutas y se importa pool para interactuar con la base de datos PostgreSQL
// Despues se crea un router, que sirve para agrupar todas las rutas relacionadas con las rutinas
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Ruta para obtener todas las rutinas junto con sus ejercicios asociados
// Despues relaciona cada rutina con su ejercicio mediante el campo routine_id y devuelve al frontend un array de rutinas, cada una con un array de ejercicios asociados

router.get("/", async (req, res) => { 
  try {
    // Consulta todos los registros de la tabla routines y los ordena por id de forma ascendente.
    const routinesResult = await pool.query(
      "SELECT * FROM routines ORDER BY id ASC"
    );

    // Consulta todos los ejercicios guardados en la tabla routine_exercise.
    const exercisesResult = await pool.query(
      "SELECT * FROM routine_exercises ORDER BY id ASC"
    );

    // Recorre todas las rutinas obtenidas de la base de datos para añadir a cada una sus ejercicios correspondientes
    const routines = routinesResult.rows.map((routine) => {

      // Filtra los ejercicios para obtener solo aquellos que pertenecen a la rutina actual (comparando el campo routine_id con exercise.routine_id) y luego mapea esos ejercicios para obtener solo su nombre.
      const ejercicios = exercisesResult.rows
        .filter((exercise) => exercise.routine_id === routine.id)
        .map((exercise) => exercise.nombre);

      // Devuelve un nuevo objeto que contiene los datos de la rutina actual junto con un nuevo campo "ejercicios" que es un array con los nombres de los ejercicios asociados a esa rutina.
      return {
        ...routine,
        ejercicios
      };
    });

    // Devuelve al frontend un array de rutinas en formato JSON
    res.json(routines);

    // Si ocurre algún error durante el proceso, se captura y se devuelve un mensaje de error al frontend con un código de estado 500 (Error Interno del Servidor).
  } catch (error) {
    console.error("Error al obtener rutinas:", error);
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
});

module.exports = router;