import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Hábitos</div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
          Inicio
        </NavLink>

        <NavLink
          to="/estadisticas"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Estadísticas
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;