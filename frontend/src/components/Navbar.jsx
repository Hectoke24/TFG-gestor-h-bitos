import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gestor de Hábitos</div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
          Hábitos
        </NavLink>

        <NavLink
          to="/estadisticas"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Estadísticas
        </NavLink>

        <NavLink
          to="/rutinas"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Rutinas
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;