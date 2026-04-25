function HabitForm({ nuevoHabito, setNuevoHabito, agregarHabito }) {
  return (
    <form onSubmit={agregarHabito}>
      <input
        type="text"
        placeholder="Escribe un hábito"
        value={nuevoHabito}
        onChange={(e) => setNuevoHabito(e.target.value)}
      />
      <button type="submit">Añadir hábito</button>
    </form>
  );
}

export default HabitForm;