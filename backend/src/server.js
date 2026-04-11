const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let habits = [
    { id: 1, nombre: "Beber agua", completado: false },
    { id: 2, nombre: "Hacer ejercicio", completado: true },
    { id: 3, nombre: "Leer 20 minutos", completado: false }
];

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.get("/habits", (req, res) => {
    res.json(habits);
});

app.post("/habits", (req, res) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del habito es obligatorio"});
    }

    const nuevoHabito = {
        id: habits.length + 1,
        nombre,
        completado: false
    };

    habits.push(nuevoHabito);
    res.status(201).json(nuevoHabito);
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});
