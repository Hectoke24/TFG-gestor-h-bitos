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
  const fechaHoy = new Date().toISOString().split("T")[0];

  try {
    const habitResult = await pool.query(
      "SELECT * FROM habits WHERE id = $1",
      [id]
    );

    if (habitResult.rows.length === 0) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    const habit = habitResult.rows[0];
    const nuevoEstado = !habit.completado;

    const updateResult = await pool.query(
      "UPDATE habits SET completado = $1 WHERE id = $2 RETURNING *",
      [nuevoEstado, id]
    );

    if (nuevoEstado === true) {
      await pool.query(
        `INSERT INTO habit_logs (habit_id, fecha, completado)
         VALUES ($1, $2, $3)
         ON CONFLICT (habit_id, fecha) DO NOTHING`,
        [id, fechaHoy, true]
      );
    } else {
      await pool.query(
        "DELETE FROM habit_logs WHERE habit_id = $1 AND fecha = $2",
        [id, fechaHoy]
      );
    }

    res.json(updateResult.rows[0]);
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

router.get("/stats/daily", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT fecha, COUNT(*) AS completados
      FROM habit_logs
      WHERE completado = true
      GROUP BY fecha
      ORDER BY fecha ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener estadísticas diarias:", error);
    res.status(500).json({ error: "Error al obtener estadísticas diarias" });
  }
});

router.get("/stats/weekly", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT TO_CHAR(fecha, 'IYYY-IW') AS semana, COUNT(*) AS completados
      FROM habit_logs
      WHERE completado = true
      GROUP BY semana
      ORDER BY semana ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener estadísticas semanales:", error);
    res.status(500).json({ error: "Error al obtener estadísticas semanales" });
  }
});

router.get("/stats/streak", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT fecha
      FROM habit_logs
      WHERE completado = true
      ORDER BY fecha DESC
    `);

    const fechas = result.rows.map((row) => row.fecha.toISOString().split("T")[0]);

    if (fechas.length === 0) {
      return res.json({ rachaActual: 0 });
    }

    let rachaActual = 0;
    let fechaEsperada = new Date();

    for (const fecha of fechas) {
      const fechaFormateada = fechaEsperada.toISOString().split("T")[0];

      if (fecha === fechaFormateada) {
        rachaActual++;
        fechaEsperada.setDate(fechaEsperada.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ rachaActual });
  } catch (error) {
    console.error("Error al obtener la racha actual:", error);
    res.status(500).json({ error: "Error al obtener la racha actual" });
  }
});

router.get("/stats/max-streak", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT fecha
      FROM habit_logs
      WHERE completado = true
      ORDER BY fecha ASC
    `);

    const fechas = result.rows.map((row) =>
      row.fecha.toISOString().split("T")[0]
    );

    if (fechas.length === 0) {
      return res.json({ rachaMaxima: 0 });
    }

    let rachaMaxima = 1;
    let rachaActual = 1;

    for (let i = 1; i < fechas.length; i++) {
      const fechaAnterior = new Date(fechas[i - 1]);
      const fechaActual = new Date(fechas[i]);

      const diferenciaDias =
        (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

      if (diferenciaDias === 1) {
        rachaActual++;
        if (rachaActual > rachaMaxima) {
          rachaMaxima = rachaActual;
        }
      } else {
        rachaActual = 1;
      }
    }

    res.json({ rachaMaxima });
  } catch (error) {
    console.error("Error al obtener la racha máxima:", error);
    res.status(500).json({ error: "Error al obtener la racha máxima" });
  }
});

module.exports = router;