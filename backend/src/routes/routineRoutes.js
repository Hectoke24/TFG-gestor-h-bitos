const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const routinesResult = await pool.query(
      "SELECT * FROM routines ORDER BY id ASC"
    );

    const exercisesResult = await pool.query(
      "SELECT * FROM routine_exercises ORDER BY id ASC"
    );

    const routines = routinesResult.rows.map((routine) => {
      const ejercicios = exercisesResult.rows
        .filter((exercise) => exercise.routine_id === routine.id)
        .map((exercise) => exercise.nombre);

      return {
        ...routine,
        ejercicios
      };
    });

    res.json(routines);
  } catch (error) {
    console.error("Error al obtener rutinas:", error);
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
});

module.exports = router;