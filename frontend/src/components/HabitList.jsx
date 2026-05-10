import { useState } from "react";

function HabitList({ habits, cambiarEstadoHabito, eliminarHabito, editarHabito }) {
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("General");

  const empezarEdicion = (habit) => {
    setEditandoId(habit.id);
    setNuevoNombre(habit.nombre);
    setNuevaCategoria(habit.categoria || "General");
  };

  const guardarEdicion = async (id) => {
    if (nuevoNombre.trim() === "") return;

    await editarHabito(id, nuevoNombre, nuevaCategoria);
    setEditandoId(null);
    setNuevoNombre("");
    setNuevaCategoria("General");
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre("");
    setNuevaCategoria("General");
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
              <div className="habit-edit-fields">
                <input
                  type="text"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                />

                <select
                  value={nuevaCategoria}
                  onChange={(e) => setNuevaCategoria(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Salud">Salud</option>
                  <option value="Estudio">Estudio</option>
                  <option value="Ejercicio">Ejercicio</option>
                  <option value="Descanso">Descanso</option>
                </select>
              </div>
            ) : (
              <>
                <div className="habit-name-block">
                  <span className="habit-name">{habit.nombre}</span>
                  <span className="habit-category">{habit.categoria}</span>
                </div>
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