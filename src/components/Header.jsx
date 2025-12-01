import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { getCartItems } from "../services/cartService";

export default function Header() {
  const { session, logout } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function readCount() {
      if (!session) {
        setCartCount(0);
        return;
      }
      
      try {
        const cartItems = await getCartItems();
        const count = Array.isArray(cartItems) ? cartItems.reduce((a, i) => a + (i.quantity || 1), 0) : 0;
        setCartCount(count);
      } catch (error) {
        console.error('Error reading cart count:', error);
        setCartCount(0);
      }
    }
    
    readCount();
    const onUpdate = () => readCount();
    window.addEventListener("levelup_cart_updated", onUpdate);
    return () => {
      window.removeEventListener("levelup_cart_updated", onUpdate);
    };
  }, [session]);
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
          {session?.user?.role === 'ADMIN' && (
            <li><Link to="/products" className="admin-link">Admin Productos</Link></li>
          )}
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
