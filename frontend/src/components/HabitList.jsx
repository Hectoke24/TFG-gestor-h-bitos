import { useState } from "react";

function HabitList({ habits, cambiarEstadoHabito, eliminarHabito, editarHabito }) {
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");

  const empezarEdicion = (habit) => {
    setEditandoId(habit.id);
    setNuevoNombre(habit.nombre);
  };

  const guardarEdicion = async (id) => {
    if (nuevoNombre.trim() === "") return;

    await editarHabito(id, nuevoNombre);
    setEditandoId(null);
    setNuevoNombre("");
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre("");
  };

  if (habits.length === 0) {
    return <p className="empty-message">Todavía no hay hábitos creados.</p>;
  }

  return (
    <ul>
      {habits.map((habit) => (
        <li
          key={habit.id}
          className={habit.completado ? "habit-card completed" : "habit-card pending"}
        >
          <div className="habit-top">
            {editandoId === habit.id ? (
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            ) : (
              <>
                <span className="habit-name">{habit.nombre}</span>
                <span className={habit.completado ? "habit-status done" : "habit-status todo"}>
                  {habit.completado ? "Hecho" : "Pendiente"}
                </span>
              </>
            )}
          </div>

          <div className="habit-actions">
            {editandoId === habit.id ? (
              <>
                <button type="button" onClick={() => guardarEdicion(habit.id)}>
                  Guardar
                </button>
                <button type="button" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => cambiarEstadoHabito(habit.id)}>
                  {habit.completado ? "Marcar como pendiente" : "Marcar como hecho"}
                </button>

                <button type="button" onClick={() => empezarEdicion(habit)}>
                  Editar
                </button>

                <button type="button" onClick={() => eliminarHabito(habit.id)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;