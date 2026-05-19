// Aqui se importan las herramientas necesarias y componentes necesarios para que funcione la app
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Rutinas from "./pages/Rutinas";

function App() {
  // Define los estados principales de la aplicación: lista de hábitos, nuevo hábito, categoría seleccionada y filtro de categoría 
  const [habits, setHabits] = useState([]);
  const [nuevoHabito, setNuevoHabito] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");

  // Carga los hábitos desde el backend al iniciar la aplicación
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
  }, []);

  // Permite crear un nuevo habito desde el frontend
  const agregarHabito = async (e) => {
    e.preventDefault();

    if (nuevoHabito.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3000/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre: nuevoHabito, categoria })
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

  // Permite cambiar el estado de un hábito (completado o no completado)
  const cambiarEstadoHabito = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/habits/${id}`, {
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el hábito");
      }

      const habitoActualizado = await response.json();

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === id ? habitoActualizado : habit
        )
      );
    } catch (error) {
      console.error("Error al actualizar el hábito:", error);
    }
  };

  // Permite eliminar un hábito desde el frontend
  const eliminarHabito = async (id) => {
  const confirmar = window.confirm("¿Seguro que quieres eliminar este hábito?");

  if (!confirmar) return;

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

  // Permite editar un hábito desde el frontend
  const editarHabito = async (id, nuevoNombre, nuevaCategoria) => {
  try {
    const response = await fetch(`http://localhost:3000/habits/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nuevoNombre,
        categoria: nuevaCategoria
      })
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

  // Define la estructura visual principal de la aplicacion y configura la aplicacion
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                habits={habits}
                nuevoHabito={nuevoHabito}
                setNuevoHabito={setNuevoHabito}
                categoria={categoria}
                setCategoria={setCategoria}
                agregarHabito={agregarHabito}
                cambiarEstadoHabito={cambiarEstadoHabito}
                eliminarHabito={eliminarHabito}
                editarHabito={editarHabito}
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
              />
            }
          />
          <Route path="/estadisticas" element={<Stats habits={habits} />} />
          <Route path="/rutinas" element={<Rutinas />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;