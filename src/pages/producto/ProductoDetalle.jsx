import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../data/products";

function formatCLP(v){ return `$${(v||0).toLocaleString('es-CL')}`; }

export default function ProductoDetalle(){
  const { slug } = useParams();
  const p = getProduct(slug);

  if(!p){
    return (
      <div className="container">
        <h1>Producto no encontrado</h1>
        <Link className="btn" to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detalle">
        <img src={p.img} alt={p.title} />
        <h1>{p.title}</h1>
        <p className="precio">{formatCLP(p.price)} CLP</p>
        {p.descr && <p>{p.descr}</p>}
        {p.details?.length>0 && (
          <ul>
            {p.details.map((d,i)=> <li key={i}>{d}</li>)}
          </ul>
        )}
        <button className="boton">Agregar al carrito</button>
      </div>

      {p.reviews?.length>0 && (
        <div className="reseñas-producto">
          <h3>Reseñas</h3>
          {p.reviews.map((r,i)=> (
            <div className="reseña" key={i}>
              <div className="usuario-info">
                <img src={r.avatar} alt="Foto de usuario" className="foto-usuario" />
                <p className="autor">{r.author}</p>
              </div>
              <p className="texto">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      <Link to="/catalogo" className="boton-volver">⬅ Volver</Link>
    </div>
  );
}
