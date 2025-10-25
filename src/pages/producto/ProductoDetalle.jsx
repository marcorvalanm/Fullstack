import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../data/products";

function formatCLP(v){ return `$${(v||0).toLocaleString('es-CL')}`; }
const AVATAR_FALLBACK = "/img/avatar_placeholder.svg";

export default function ProductoDetalle(){
  const { slug } = useParams();
  const p = getProduct(slug);
  const [open, setOpen] = useState(false);

  if(!p){
    return (
      <div className="container">
        <h1>Producto no encontrado</h1>
        <Link className="btn" to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  const ratingInfo = useMemo(()=>{
    const list = Array.isArray(p.reviews)? p.reviews : [];
    const withRatings = list.filter(r=> typeof r.rating === 'number');
    if(!withRatings.length) return { avg: 0, count: list.length };
    const sum = withRatings.reduce((a,r)=> a + Math.max(0, Math.min(5, r.rating)), 0);
    const avg = Math.round((sum / withRatings.length) * 10) / 10;
    return { avg, count: list.length };
  },[p]);

  function addToCart(){
    try{
      const key = "levelup_cart";
      const cart = JSON.parse(localStorage.getItem(key) || "[]");
      const idx = cart.findIndex(i => i.id === p.id);
      if(idx >= 0){
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({ id:p.id, product:p.title, price:p.price, category:p.category, qty:1, img:p.img });
      }
      localStorage.setItem(key, JSON.stringify(cart));
      try{ window.dispatchEvent(new Event("levelup_cart_updated")); }catch{}
      alert(`${p.title} agregado al carrito ✅`);
    }catch{}
  }

  return (
    <div className="container">
      <div className="detalle">
        <img src={p.img} alt={p.title} />
        <h1>{p.title}</h1>
        <p className="precio">{formatCLP(p.price)} CLP</p>
        <div className="stars" role="button" tabIndex={0} onClick={()=>setOpen(true)} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' ') setOpen(true); }} aria-label={`Ver reseñas, calificación promedio ${ratingInfo.avg} de 5`}>
          {Array.from({length:5}).map((_,i)=>{
            const filled = ratingInfo.avg >= i+1 - 0.5;
            return <span key={i} className={filled? 'star filled':'star'}>★</span>;
          })}
          <span className="stars-meta">{ratingInfo.avg || 'N/A'} ({ratingInfo.count})</span>
        </div>
        {p.descr && <p>{p.descr}</p>}
        {p.details?.length>0 && (
          <ul>
            {p.details.map((d,i)=> <li key={i}>{d}</li>)}
          </ul>
        )}
        <button className="boton" onClick={addToCart}>Agregar al carrito</button>
      </div>

      {open && (
        <div className="modal-overlay" onClick={()=>setOpen(false)}>
          <div className="modal-content" role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3>Reseñas de {p.title}</h3>
              <button className="btn-logout" onClick={()=>setOpen(false)}>Cerrar</button>
            </div>
            <div className="stars" style={{margin:'6px 0 12px'}}>
              {Array.from({length:5}).map((_,i)=> <span key={i} className={i < Math.round(ratingInfo.avg) ? 'star filled':'star'}>★</span>)}
              <span className="stars-meta">{ratingInfo.avg} ({ratingInfo.count})</span>
            </div>
            <div style={{maxHeight:'50vh', overflow:'auto'}}>
              {(p.reviews||[]).map((r,i)=> (
                <div className="reseña" key={i}>
                  <div className="usuario-info">
                    <img src={r.avatar || AVATAR_FALLBACK} alt="Foto de usuario" className="foto-usuario" />
                    <p className="autor">{r.author}</p>
                  </div>
                  <div className="stars small">
                    {Array.from({length:5}).map((_,k)=> <span key={k} className={k < (r.rating||0) ? 'star filled':'star'}>★</span>)}
                  </div>
                  <p className="texto">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Link to="/catalogo" className="boton-volver">⬅ Volver</Link>
    </div>
  );
}
