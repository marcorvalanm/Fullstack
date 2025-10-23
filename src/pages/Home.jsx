import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenido a Level-Up Gamer</h1>
        <p>Tu tienda gamer en Chile ⚡ Consolas, PCs, accesorios y todo lo que necesitas para subir de nivel 🎮.</p>
      </section>

      <section className="section">
        <h2>🔥 Productos Destacados</h2>
        <div className="grid">
          <div className="card">
            <img src="/img/xbox.png" alt="Xbox Series X" />
            <h3>Xbox Series X</h3>
            <p>Potencia de nueva generación, compatible con Game Pass.</p>
            <Link to="/producto/xbox">Ver más</Link>
          </div>
          <div className="card">
            <img src="/img/teclado.webp" alt="Teclado RGB" />
            <h3>Teclado Mecánico RGB</h3>
            <p>Switches azules, retroiluminación personalizable.</p>
            <Link to="/producto/teclado">Ver más</Link>
          </div>
          <div className="card">
            <img src="/img/silla.png" alt="Silla Gamer" />
            <h3>Silla Gamer Pro</h3>
            <p>Comodidad y estilo para tus largas sesiones de juego.</p>
            <Link to="/producto/silla">Ver más</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>⚡ Accesos Rápidos</h2>
        <div className="grid">
          <div className="card">
            <h3>Catálogo</h3>
            <p>Mira todos nuestros productos organizados por categoría.</p>
            <Link to="/catalogo">Ir al catálogo</Link>
          </div>
          <div className="card">
            <h3>Carrito de Compras</h3>
            <p>Revisa lo que has seleccionado y finaliza tu compra.</p>
            <Link to="/carrito">Ir al carrito</Link>
          </div>
          <div className="card">
            <h3>Blog & Comunidad</h3>
            <p>Noticias, guías y eventos del mundo gamer en Chile.</p>
            <Link to="/blog">Ir al blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
