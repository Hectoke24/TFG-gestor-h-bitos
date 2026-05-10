function HabitForm({ nuevoHabito, setNuevoHabito, categoria, setCategoria, agregarHabito }) {
  return (
    <form onSubmit={agregarHabito}>
      <input
        type="text"
        placeholder="Escribe un hábito"
        value={nuevoHabito}
        onChange={(e) => setNuevoHabito(e.target.value)}
      />

      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="General">General</option>
        <option value="Salud">Salud</option>
        <option value="Estudio">Estudio</option>
        <option value="Ejercicio">Ejercicio</option>
        <option value="Descanso">Descanso</option>
      </select>

      <button type="submit">Añadir hábito</button>
    </form>
  );
}

export default HabitForm;