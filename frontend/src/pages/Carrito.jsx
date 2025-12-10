import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function Carrito(){
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { session } = useSession();
  const isDuoc = !!(session?.email && session.email.toLowerCase().endsWith("@duocuc.cl"));

  function loadUsers(){ try{ return JSON.parse(localStorage.getItem("levelup_users")||"[]"); }catch{ return []; } }
  function saveUsers(list){ try{ localStorage.setItem("levelup_users", JSON.stringify(list)); }catch{} }
  function computeLevel(points){
    if(points >= 1000) return 3; // 10%
    if(points >= 500) return 2;  // 5%
    return 1;                     // 0%
  }
  function getUser(){
    if(!session?.email) return null;
    const users = loadUsers();
    return users.find(u=>u.email===session.email) || null;
  }

  useEffect(()=>{
    const key = "levelup_cart";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if(stored.length){
      const normalized = stored.map((i,idx)=>({ id:i.id || idx+1, name:i.product, price:i.price, quantity:i.qty||1, image:i.img || i.image || "" }));
      setItems(normalized);
    } else {
      setItems([]);
    }
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(!loaded) return; // evita borrar el carrito en el primer render con StrictMode
    const key = "levelup_cart";
    const toSave = items.map(i=>({ id:i.id, product:i.name, price:i.price, category:"", qty:i.quantity }));
    localStorage.setItem(key, JSON.stringify(toSave));
    try{ window.dispatchEvent(new Event("levelup_cart_updated")); }catch{}
  },[items, loaded]);

  function changeQuantity(index, delta){
    setItems(prev=>{
      const next=[...prev];
      const current = Number(next[index].quantity) || 1;
      next[index].quantity = Math.max(1, current + delta);
      return next;
    });
  }

  // Evita repetición por mantener presionado o dobles eventos muy seguidos
  const lastClickRef = useRef(0);
  const lockRef = useRef(false);
  function safeChangeQuantity(index, delta){
    if(lockRef.current) return; // evita auto-repeat y dobles invocaciones
    const now = Date.now();
    if(now - lastClickRef.current < 220) return; // ignora clicks muy seguidos
    lastClickRef.current = now;
    lockRef.current = true;
    changeQuantity(index, delta);
    setTimeout(()=>{ lockRef.current = false; }, 250);
  }

  function handleStep(e, index, delta){
    // Evita que algunos navegadores disparen mouse y touch/pointer duplicados
    if(e && typeof e.preventDefault === 'function') e.preventDefault();
    if(e && typeof e.stopPropagation === 'function') e.stopPropagation();
    safeChangeQuantity(index, delta);
  }

  function onQuantityChange(index, value){
    setItems(prev=>{
      const next=[...prev];
      if(value === ""){
        next[index].quantity = ""; // permite borrar para tipear
      } else {
        const q = parseInt(value,10);
        next[index].quantity = isNaN(q) ? 1 : Math.max(1, q);
      }
      return next;
    });
  }

  function onQuantityBlur(index){
    setItems(prev=>{
      const next=[...prev];
      const q = parseInt(next[index].quantity,10);
      next[index].quantity = isNaN(q) || q < 1 ? 1 : q;
      return next;
    });
  }

  function removeItem(index){
    setItems(prev=> prev.filter((_,i)=>i!==index));
  }

  const { subtotal, duocDiscount, levelDiscount, applied, total } = useMemo(()=>{
    const st = items.reduce((acc,i)=>{
      const q = parseInt(i.quantity,10);
      const qty = isNaN(q) ? 0 : q;
      return acc + i.price * qty;
    }, 0);
    // Descuento por nivel (5% nivel 2, 10% nivel 3)
    let lvlPct = 0;
    const u = getUser();
    const lvl = u?.level || computeLevel(u?.points||0);
    if(lvl >= 3) lvlPct = 0.10; else if(lvl >= 2) lvlPct = 0.05;
    const lvlDc = Math.round(st * lvlPct);
    // Descuento DUOC 20%
    const duocDc = isDuoc ? Math.round(st * 0.20) : 0;
    // No acumulables: aplica el mayor
    const appliedKind = duocDc >= lvlDc ? 'duoc' : 'level';
    const effective = appliedKind === 'duoc' ? duocDc : lvlDc;
    const tt = Math.max(0, st - effective);
    return { subtotal: st, duocDiscount: duocDc, levelDiscount: lvlDc, applied: appliedKind, total: tt };
  },[items, isDuoc, session]);

  function awardPointsOnCheckout(amountPaid){
    if(!session?.email) return;
    const users = loadUsers();
    const idx = users.findIndex(u=>u.email===session.email);
    if(idx<0) return;
    const earn = Math.max(0, Math.floor(amountPaid / 1000)); // 1 punto por cada $1000
    const prevPts = Number(users[idx].points||0);
    const newPts = prevPts + earn;
    const newLvl = computeLevel(newPts);
    users[idx] = { ...users[idx], points: newPts, level: newLvl };
    saveUsers(users);
    return { earn, newPts, newLvl };
  }

  return (
    <div className="container">
      <section className="cart-section">
        <div className="cart-header">
          <h2>Tu Carrito de Compras</h2>
          <span id="cart-count">{items.length} productos</span>
        </div>
        {items.length === 0 ? (
          <div className="cart-items" id="cart-items">
            <p style={{textAlign:'center', color:'#D3D3D3'}}>Tu carrito está vacío.</p>
            <div style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
              <Link to="/catalogo" className="btn btn-primary">Ir a comprar</Link>
            </div>
          </div>
        ) : (
          <div className="cart-items" id="cart-items">
            {items.map((item,index)=>(
              <div className="cart-item" key={item.id}>
                <div className="item-img">{item.image ? <img src={item.image} alt={item.name} /> : null}</div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">{formatCLP(item.price)} CLP</div>
                  <div className="item-quantity">
                    <button type="button" className="quantity-btn" onClick={(e)=>handleStep(e,index,-1)}>-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      min={1}
                      step={1}
                      inputMode="numeric"
                      onChange={(e)=>onQuantityChange(index, e.target.value)}
                      onBlur={()=>onQuantityBlur(index)}
                      onKeyDown={(e)=>{ if(e.key==='Enter'){ e.currentTarget.blur(); } }}
                    />
                    <button type="button" className="quantity-btn" onClick={(e)=>handleStep(e,index,1)}>+</button>
                    <button className="remove-item" onClick={()=>removeItem(index)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span id="subtotal">{formatCLP(subtotal)} CLP</span>
          </div>
          <div className="summary-row">
            <span>Descuento Nivel
              {(()=>{ const u=getUser(); const l=u?.level||computeLevel(u?.points||0); return l>=3?" (10%)": l>=2?" (5%)":" (0%)"; })()}
              {applied==='duoc'?" (no acumulable)":""}:</span>
            <span id="discount-level">-{formatCLP(applied==='level'?levelDiscount:0)} CLP</span>
          </div>
          <div className="summary-row">
            <span>Descuento {isDuoc?"DUOC 20%":"DUOC"}{applied==='level'?" (no acumulable)":""}:</span>
            <span id="discount-duoc">-{formatCLP(applied==='duoc'?duocDiscount:0)} CLP</span>
          </div>
          <div className="hint" style={{marginTop:4}}>Descuentos LevelUp y DUOC no son acumulables; se aplica el mayor.</div>
          <div className="summary-row summary-total">
            <span>Total:</span>
            <span id="total">{formatCLP(total)} CLP</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
            <Link to="/catalogo" className="btn btn-secondary">Seguir comprando</Link>
            <button className="btn btn-primary checkout-btn" id="checkout-btn" onClick={()=>{
              const res = awardPointsOnCheckout(total);
              if(res){ alert(`¡Gracias por tu compra! +${res.earn} pts LevelUp. Total puntos: ${res.newPts}. Nivel: ${res.newLvl}`); }
              else { alert('¡Gracias por tu compra!'); }
            }}>Proceder al Pago</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatCLP(v){
  return `$${(v||0).toLocaleString('es-CL')}`;
}
