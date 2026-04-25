import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

function Home({
  habits,
  nuevoHabito,
  setNuevoHabito,
  agregarHabito,
  cambiarEstadoHabito,
  eliminarHabito,
  editarHabito
}) {
  return (
    <div>
      <h1>Gestor de Hábitos</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "24px" }}>
        Organiza tus hábitos diarios y consulta tu progreso.
      </p>

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

export default Home;