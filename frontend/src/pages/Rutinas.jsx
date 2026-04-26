import { useEffect, useState } from "react";

function Rutinas() {
  const [filtro, setFiltro] = useState("Todas");
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const response = await fetch("http://localhost:3000/routines");
        const data = await response.json();
        setRutinas(data);
      } catch (error) {
        console.error("Error al cargar rutinas:", error);
      }
    };

    cargarRutinas();
  }, []);

  const rutinasFiltradas =
    filtro === "Todas"
      ? rutinas
      : rutinas.filter((rutina) => rutina.tipo === filtro);

  return (
    <div className="rutinas-page">
      <h1>Rutinas</h1>
      <p className="rutinas-subtitle">
        Selecciona una rutina y úsala como apoyo para tus hábitos saludables.
      </p>

      <div className="rutinas-filtros">
        <button
          type="button"
          className={filtro === "Todas" ? "filtro-activo" : ""}
          onClick={() => setFiltro("Todas")}
        >
          Todas
        </button>
        <button
          type="button"
          className={filtro === "Espalda" ? "filtro-activo" : ""}
          onClick={() => setFiltro("Espalda")}
        >
          Espalda
        </button>
        <button
          type="button"
          className={filtro === "Pierna" ? "filtro-activo" : ""}
          onClick={() => setFiltro("Pierna")}
        >
          Pierna
        </button>
        <button
          type="button"
          className={filtro === "Pecho" ? "filtro-activo" : ""}
          onClick={() => setFiltro("Pecho")}
        >
          Pecho
        </button>
        <button
          type="button"
          className={filtro === "Core" ? "filtro-activo" : ""}
          onClick={() => setFiltro("Core")}
        >
          Core
        </button>
      </div>

      <div className="rutinas-grid">
        {rutinasFiltradas.map((rutina) => (
          <div key={rutina.id} className="rutina-card">
            <div className="rutina-header">
              <h2>{rutina.nombre}</h2>
              <span className="rutina-badge">{rutina.tipo}</span>
            </div>

            <p className="rutina-duracion">
              <strong>Duración:</strong> {rutina.duracion}
            </p>

            <p className="rutina-descripcion">{rutina.descripcion}</p>

            <h3>Ejercicios</h3>
            <ul className="rutina-lista">
              {rutina.ejercicios.map((ejercicio, index) => (
                <li key={index}>{ejercicio}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rutinas;