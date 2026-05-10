import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

function Home({
  habits,
  nuevoHabito,
  setNuevoHabito,
  categoria,
  setCategoria,
  filtroCategoria,
  setFiltroCategoria,
  agregarHabito,
  cambiarEstadoHabito,
  eliminarHabito,
  editarHabito
}) {
  const habitsFiltrados =
    filtroCategoria === "Todas"
      ? habits
      : habits.filter((habit) => habit.categoria === filtroCategoria);
  
  const totalHabitos = habits.length;
  const completadosHoy = habits.filter((habit) => habit.completado).length;

  return (
    <div>
      <h1>Gestor de Hábitos</h1>
      <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "20px" }}>
        Hoy has completado {completadosHoy} de {totalHabitos} hábitos.
      </p>

      <HabitForm
        nuevoHabito={nuevoHabito}
        setNuevoHabito={setNuevoHabito}
        categoria={categoria}
        setCategoria={setCategoria}
        agregarHabito={agregarHabito}
      />

      <div className="filtros-habitos">
        <button
          type="button"
          className={filtroCategoria === "Todas" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("Todas")}
        >
          Todas
        </button>

        <button
          type="button"
          className={filtroCategoria === "General" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("General")}
        >
          General
        </button>

        <button
          type="button"
          className={filtroCategoria === "Salud" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("Salud")}
        >
          Salud
        </button>

        <button
          type="button"
          className={filtroCategoria === "Estudio" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("Estudio")}
        >
          Estudio
        </button>

        <button
          type="button"
          className={filtroCategoria === "Ejercicio" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("Ejercicio")}
        >
          Ejercicio
        </button>

        <button
          type="button"
          className={filtroCategoria === "Descanso" ? "filtro-activo" : ""}
          onClick={() => setFiltroCategoria("Descanso")}
        >
          Descanso
        </button>
      </div>

      <h2>Lista de hábitos</h2>

      <HabitList
        habits={habitsFiltrados}
        cambiarEstadoHabito={cambiarEstadoHabito}
        eliminarHabito={eliminarHabito}
        editarHabito={editarHabito}
      />
    </div>
  );
}

export default Home;