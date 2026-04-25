import "./App.css";
import { useEffect, useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

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

  const editarHabito = async (id, nuevoNombre) => {
  try {
    const response = await fetch(`http://localhost:3000/habits/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });

    if (!response.ok) {
      throw new Error("Error al editar el hábito");
    }

    const habitoActualizado = await response.json();

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? habitoActualizado : habit
      )
    );
  } catch (error) {
    console.error("Error al editar el hábito:", error);
  }
};

  return (
    <div className="container">
      <h1>Gestor de Hábitos</h1>

      <HabitForm
        nuevoHabito={nuevoHabito}
        setNuevoHabito={setNuevoHabito}
        agregarHabito={agregarHabito}
      />

      <h2>Lista de hábitos</h2>

      <HabitList
        habits={habits}
        cambiarEstadoHabito={cambiarEstadoHabito}
        eliminarHabito={eliminarHabito}
        editarHabito={editarHabito}
      />
    </div>
  );
}

export default App;