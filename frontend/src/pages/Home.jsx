import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then(data => {
        if (!Array.isArray(data)) { throw new Error("La API no devolvió una lista"); }
        // Mostramos los primeros 3 como destacados
        setFeatured(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenido a Level-Up Gamer</h1>
        <p>Tu tienda gamer en Chile ⚡ Consolas, PCs, accesorios y todo lo que necesitas para subir de nivel 🎮.</p>
      </section>

      <section className="section">
        <h2>🔥 Productos Destacados</h2>
        {loading && <p>Cargando destacados...</p>}
        {error && <div style={{ color: 'red', background: '#330000', padding: '1rem', borderRadius: '8px' }}>
          <h3>Error al conectar con el servidor</h3>
          <p>Detalle: {error}</p>
          <p>Asegúrate de que el Backend esté corriendo en el puerto 8080.</p>
        </div>}

        {!loading && !error && featured.length === 0 && (
          <p>No se encontraron productos destacados. (La base de datos parece vacía)</p>
        )}

        {!loading && !error && featured.length > 0 && (
          <div className="grid">
            {featured.map(p => (
              <div className="card" key={p.id}>
                <img src={p.img} alt={p.title} />
                <h3>{p.title}</h3>
                <p>{p.category}</p>
                <Link to={`/producto/${p.id}`}>Ver más</Link>
              </div>
            ))}
          </div>
        )}
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
