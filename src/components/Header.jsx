import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";

export default function Header() {
  const { session, logout } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function readCount() {
      try {
        const key = "levelup_cart";
        const cart = JSON.parse(localStorage.getItem(key) || "[]");
        setCartCount(Array.isArray(cart) ? cart.reduce((a, i) => a + (i.qty || 1), 0) : 0);
      } catch {
        setCartCount(0);
      }
    }
    readCount();
    const onUpdate = () => readCount();
    window.addEventListener("storage", onUpdate);
    window.addEventListener("levelup_cart_updated", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("levelup_cart_updated", onUpdate);
    };
  }, []);
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
        <Link to="/carrito" className="btn btn-secondary" aria-label="Carrito">
          🛒 {cartCount === 0 ? 'Vacío' : cartCount}
        </Link>
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
