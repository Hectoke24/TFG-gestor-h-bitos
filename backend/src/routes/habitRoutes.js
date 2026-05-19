// Se importa Express para crear rutas y se importa pool para interactuar con la base de datos PostgreSQL
// Despues se crea un router, que sirve para agrupar todas las rutas relacionadas con los habitos
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Ruta para obtener todos los hábitos junto con su estado de completado para el día actual
router.get("/", async (req, res) => {
  const fechaHoy = new Date().toISOString().split("T")[0];

  try {
    const result = await pool.query(
      `
      SELECT 
        h.id,
        h.nombre,
        h.categoria,
        CASE 
          WHEN hl.id IS NOT NULL THEN true
          ELSE false
        END AS completado
      FROM habits h
      LEFT JOIN habit_logs hl
        ON h.id = hl.habit_id
        AND hl.fecha = $1
        AND hl.completado = true
      ORDER BY h.id ASC
      `,
      [fechaHoy]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener hábitos:", error);
    res.status(500).json({ error: "Error al obtener hábitos" });
  }
});

// Ruta para añadir/crear un nuevo hábito a la base de datos
router.post("/", async (req, res) => {
  const { nombre, categoria } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  try {
    const result = await pool.query(
  "INSERT INTO habits (nombre, completado, categoria) VALUES ($1, $2, $3) RETURNING *",
  [nombre, false, categoria || "General"]
);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al añadir hábito:", error);
    res.status(500).json({ error: "Error al añadir hábito" });
  }
});

// Ruta para actualizar el estado de completado de un hábito para el día actual. Si el habito ya esta completado, se elimina el registro de completado para ese día, y si no esta completado, se añade un nuevo registro y pasa a pendiente.
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

    const logResult = await pool.query(
      "SELECT * FROM habit_logs WHERE habit_id = $1 AND fecha = $2",
      [id, fechaHoy]
    );

    let completado;

    if (logResult.rows.length > 0) {
      await pool.query(
        "DELETE FROM habit_logs WHERE habit_id = $1 AND fecha = $2",
        [id, fechaHoy]
      );
      completado = false;
    } else {
      await pool.query(
        `INSERT INTO habit_logs (habit_id, fecha, completado)
         VALUES ($1, $2, $3)
         ON CONFLICT (habit_id, fecha) DO NOTHING`,
        [id, fechaHoy, true]
      );
      completado = true;
    }

    res.json({
      ...habitResult.rows[0],
      completado
    });
  } catch (error) {
    console.error("Error al actualizar hábito:", error);
    res.status(500).json({ error: "Error al actualizar hábito" });
  }
});

// Ruta para editar el nombre y la categoría de un hábito existente
router.put("/:id/edit", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, categoria } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  try {
    const result = await pool.query(
  "UPDATE habits SET nombre = $1, categoria = $2 WHERE id = $3 RETURNING *",
  [nombre, categoria || "General", id]
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

// Ruta para eliminar un hábito de la base de datos.
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

// Obtiene el numero de hábitos completados por día, agrupados por fecha
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

// Obtiene el numero de hábitos completados por semana, agrupados por semana (formato IYYY-IW)
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

// Calcula la racha actual de dias consecutivos con habitos completados.
router.get("/stats/streak", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT fecha
      FROM habit_logs
      WHERE completado = true
      ORDER BY fecha DESC
    `);

    if (result.rows.length === 0) {
      return res.json({ rachaActual: 0 });
    }

    const fechas = result.rows.map((row) => {
      const fecha = new Date(row.fecha);
      fecha.setHours(0, 0, 0, 0);
      return fecha;
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    let rachaActual = 0;
    let fechaEsperada = new Date(hoy);

    for (const fecha of fechas) {
      if (fecha.getTime() === fechaEsperada.getTime()) {
        rachaActual++;
        fechaEsperada.setDate(fechaEsperada.getDate() - 1);
      } else if (fecha.getTime() < fechaEsperada.getTime()) {
        break;
      }
    }

    res.json({ rachaActual });
  } catch (error) {
    console.error("Error al obtener la racha actual:", error);
    res.status(500).json({ error: "Error al obtener la racha actual" });
  }
});

// Calcula la racha máxima de días consecutivos con hábitos completados.
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