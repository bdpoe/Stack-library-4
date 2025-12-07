import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-amber-700 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-extrabold text-xl tracking-wide"
        >
          📚 <span>Biblioteca Escolar</span>
        </Link>

        {/* Usuario no logueado */}
        {!user && <div></div>}

        {/* Usuario logueado */}
        {user && (
          <ul className="flex gap-3 items-center">

            {/* Inicio */}
            <li>
              <Link
                to="/"
                className="bg-white text-amber-800 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-amber-100 transition"
              >
                Inicio
              </Link>
            </li>

            {/* Agregar Libro - SOLO BIBLIOTECARIO */}
            {user.role === "librarian" && (
              <li>
                <Link
                  to="/new"
                  className="bg-yellow-500 text-white font-semibold px-3 py-1.5 rounded-full shadow hover:bg-yellow-600 transition"
                >
                  Agregar libro
                </Link>
              </li>
            )}

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-semibold px-3 py-1.5 rounded-full shadow hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </li>

          </ul>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
