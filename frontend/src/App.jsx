import { useState, useEffect } from 'react'

function App() {
  const [habits, setHabits] = useState([]);
  const [nuevoHabito, setNuevoHabito] = useState("");

  const cargarHabitos = () => {
    fetch("http://localhost:3000/habits")
      .then((response) => response.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error("Error al cargar hábitos: ", error));
  };

  useEffect(() => {
    cargarHabitos();
  }, []);

  const agregarHabito = async (e) => {
    e.preventDefault();

    if (nuevoHabito.trim() === "") return;

    try {
      const response = await fetch ("http://localhost:3000/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre: nuevoHabito })
      });

      if (!response.ok) {
        throw new Error("Error al añadir el hábito");
      }

      setNuevoHabito("");
      cargarHabitos();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Gestor de Hábitos</h1>
      
      <form onSubmit={agregarHabito}>
        <input 
          type="text"
          placeholder="Escribe un hábito"
          value={nuevoHabito}
          onChange={(e) => setNuevoHabito(e.target.value)}
          />
        <button type="submit">Añadir hábito</button>
      </form>
      
      <h2>Lista de hábitos</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.nombre} - {habit.completado ? "Hecho" : "Pendiente"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App