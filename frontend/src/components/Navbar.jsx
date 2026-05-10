import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaDumbbell } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Hábitos</div>

      <div className="navbar-links">
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