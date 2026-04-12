import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);
  const [nuevoHabito, setNuevoHabito] = useState("");
  const [recargar, setRecargar] = useState(false);

  const cargarHabitos = async () => {
    try {
      const response = await fetch("http://localhost:3000/habits");
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Error al cargar hábitos:", error);
    }
  };

  useEffect(() => {
    cargarHabitos();
  }, [recargar]);

  const agregarHabito = async (e) => {
    e.preventDefault();

    if (nuevoHabito.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3000/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre: nuevoHabito })
      });

      if (!response.ok) {
        throw new Error("Error al añadir el hábito");
      }

      const habitoNuevo = await response.json();
      setHabits((prevHabits) => [...prevHabits, habitoNuevo]);
      setNuevoHabito("");
    } catch (error) {
      console.error("Error al añadir el hábito:", error);
    }
  };

  const cambiarEstadoHabito = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/habits/${id}`, {
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el hábito");
      }

      setRecargar((prev) => !prev);
    } catch (error) {
      console.error("Error al actualizar el hábito:", error);
    }
  };

  const eliminarHabito = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/habits/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el hábito");
      }

      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el hábito:", error);
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
            {habit.nombre} - {habit.completado ? "Hecho" : "Pendiente"}{" "}
            <button type="button" onClick={() => cambiarEstadoHabito(habit.id)}>
              {habit.completado ? "Marcar como pendiente" : "Marcar como hecho"}
            </button>{" "}
            <button type="button" onClick={() => eliminarHabito(habit.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;