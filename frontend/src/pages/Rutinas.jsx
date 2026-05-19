// Importa useState y useEfect desde React
import { useEffect, useState } from "react";

function Rutinas() {
  // Define los estados principales de la pagina de rutinas
  const [filtro, setFiltro] = useState("Todas");
  const [rutinas, setRutinas] = useState([]);

  // useEffect para cargar las rutinas desde el backend al montar el componente
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

  // Filtra las rutinas según el filtro seleccionado por el usuario
  const rutinasFiltradas =
    filtro === "Todas"
      ? rutinas
      : rutinas.filter((rutina) => rutina.tipo === filtro);
  
      // Devuelve la interfaz visual de la pagina de rutinas
  return (
    <div className="rutinas-page">
      <h1>Rutinas</h1>
      <p className="rutinas-subtitle">
        Selecciona una rutina y úsala como apoyo para tus hábitos saludables.
      </p>

      // Muestra los botones de filtro para que el usuario pueda seleccionar la categoría de rutinas que desea ver
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
        // Muestra las rutinas filtradas en tarjetas con su información principal
        {rutinasFiltradas.map((rutina) => (
          // Crea una tarjeta visual para cada rutina
          <div key={rutina.id} className="rutina-card">
            // Muestra el nombre y tipo
            <div className="rutina-header">
              <h2>{rutina.nombre}</h2>
              <span className="rutina-badge">{rutina.tipo}</span>
            </div>

            <p className="rutina-duracion">
              <strong>Duración:</strong> {rutina.duracion}
            </p>

            <p className="rutina-descripcion">{rutina.descripcion}</p>

            // Muestra la lista de ejercicios que componen la rutina
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