const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM habits ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener hábitos:", error);
    res.status(500).json({ error: "Error al obtener hábitos" });
  }
});

router.post("/", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO habits (nombre, completado) VALUES ($1, $2) RETURNING *",
      [nombre, false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al añadir hábito:", error);
    res.status(500).json({ error: "Error al añadir hábito" });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const habitResult = await pool.query("SELECT * FROM habits WHERE id = $1", [id]);

    if (habitResult.rows.length === 0) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    const habit = habitResult.rows[0];
    const nuevoEstado = !habit.completado;

    const result = await pool.query(
      "UPDATE habits SET completado = $1 WHERE id = $2 RETURNING *",
      [nuevoEstado, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar hábito:", error);
    res.status(500).json({ error: "Error al actualizar hábito" });
  }
});

router.put("/:id/edit", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  try {
    const result = await pool.query(
      "UPDATE habits SET nombre = $1 WHERE id = $2 RETURNING *",
      [nombre, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al editar hábito:", error);
    res.status(500).json({ error: "Error al editar hábito" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(
      "DELETE FROM habits WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    res.json({ mensaje: "Hábito eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar hábito:", error);
    res.status(500).json({ error: "Error al eliminar hábito" });
  }
});

module.exports = router;