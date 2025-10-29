import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../data/products";

function formatCLP(v){ return `$${(v||0).toLocaleString('es-CL')}`; }
const AVATAR_FALLBACK = "/img/avatar_placeholder.svg";

export default function ProductoDetalle(){
  const { slug } = useParams();
  const p = getProduct(slug);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const share = useMemo(()=>{
    const url = typeof window !== 'undefined' ? window.location.href : `https://example.com/producto/${p?.id||''}`;
    const text = `Mira este producto: ${p?.title || ''}`;
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    return { url, text, fb, x };
  },[p]);

  function shareNative(){
    try{
      if(navigator.share){
        navigator.share({ title: p.title, text: share.text, url: share.url }).finally(()=> setShareOpen(false));
      } else if(navigator.clipboard){
        navigator.clipboard.writeText(share.url).then(()=>{ alert('Enlace copiado. ¡Compártelo en tus redes!'); setShareOpen(false); });
      } else {
        alert('Copia este enlace y compártelo: ' + share.url);
        setShareOpen(false);
      }
    }catch{}
  }

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

        <div style={{marginTop:12, display:'flex', justifyContent:'center'}}>
          {!shareOpen && (
            <button className="boton neon" onClick={()=>setShareOpen(true)}>📤 Compartir</button>
          )}
          {shareOpen && (
            <div role="alert" aria-live="polite" style={{marginTop:8, padding:12, border:'1px solid var(--accent-green)', boxShadow:'0 0 8px rgba(57,255,20,0.4)', borderRadius:12, background:'rgba(0,0,0,0.35)', maxWidth:520, width:'100%'}}>
              <div style={{position:'relative', marginBottom:8}}>
                <button
                  className="btn-logout"
                  onClick={()=>setShareOpen(false)}
                  aria-label="Cerrar"
                  style={{position:'absolute', top:0, right:0, width:26, height:26, borderRadius:6, padding:0, lineHeight:1}}
                >
                  ✕
                </button>
                <div style={{textAlign:'center', marginTop:28}}>
                  <strong style={{color:'var(--accent-green)', fontSize:'1.25rem'}}>¿Por dónde quieres compartir este producto?</strong>
                </div>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', textAlign:'center'}}>
                <a className="boton neon" href={share.fb} target="_blank" rel="noreferrer" onClick={()=>setShareOpen(false)}>📘 Facebook</a>
                <a className="boton neon" href={share.x} target="_blank" rel="noreferrer" onClick={()=>setShareOpen(false)}>𝕏 X / Twitter</a>
                <button className="boton neon" onClick={()=>{ navigator.clipboard?.writeText(share.url); alert('Enlace copiado. Pégalo en tus redes.'); setShareOpen(false); }}>🔗 Copiar enlace</button>
              </div>
            </div>
          )}
        </div>
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
