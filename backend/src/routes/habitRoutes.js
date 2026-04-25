const express = require("express");

const router = express.Router();

let habits = [
  { id: 1, nombre: "Beber agua", completado: false },
  { id: 2, nombre: "Hacer ejercicio", completado: true },
  { id: 3, nombre: "Leer 20 minutos", completado: false }
];

router.get("/", (req, res) => {
  res.json(habits);
});

router.post("/", (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  const nuevoHabito = {
    id: habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1,
    nombre,
    completado: false
  };

  habits.push(nuevoHabito);
  res.status(201).json(nuevoHabito);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const habit = habits.find((h) => h.id === id);

  if (!habit) {
    return res.status(404).json({ error: "Hábito no encontrado" });
  }

  habit.completado = !habit.completado;
  res.json(habit);
});

router.put("/:id/edit", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre } = req.body;

  const habit = habits.find((h) => h.id === id);

  if (!habit) {
    return res.status(404).json({ error: "Hábito no encontrado" });
  }

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre del hábito es obligatorio" });
  }

  habit.nombre = nombre;
  res.json(habit);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const habit = habits.find((h) => h.id === id);

  if (!habit) {
    return res.status(404).json({ error: "Hábito no encontrado" });
  }

  habits = habits.filter((h) => h.id !== id);
  res.json({ mensaje: "Hábito eliminado correctamente" });
});

module.exports = router;