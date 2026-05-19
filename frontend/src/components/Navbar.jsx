// Importa NavLink para la navegación y los iconos de react-icons para mejorar la apariencia visual de los enlaces
import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaDumbbell } from "react-icons/fa";

// Define el componente Navbar que se encargará de mostrar la barra de navegación en la parte superior de la aplicación
function Navbar() {
  return (
    // Crea la barra de navegacion principal
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Hábitos</div>

      <div className="navbar-links">
        // Crea los enlaces de navegación utilizando NavLink para que se apliquen estilos activos cuando el enlace corresponda a la ruta actual
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          <FaHome /> Inicio
        </NavLink>

        <NavLink
          to="/estadisticas"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          <FaChartBar /> Estadísticas
        </NavLink>

        <NavLink
          to="/rutinas"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          <FaDumbbell /> Rutinas
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;