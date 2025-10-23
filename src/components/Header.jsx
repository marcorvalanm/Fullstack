import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function Header() {
  const { session, logout } = useSession();
  return (
    <header>
      <Link to="/" className="logo">LEVEL-UP GAMER</Link>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Productos</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/soporte">Soporte</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        {session ? (
          <>
            <Link to="/perfil" className="btn-profile">Mi Perfil</Link>
            <button className="btn-logout" onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login?mode=login" className="btn-login">Iniciar Sesión</Link>
            <Link to="/login?mode=register" className="btn-register">Registrarse</Link>
          </>
        )}
      </div>
    </header>
  );
}
