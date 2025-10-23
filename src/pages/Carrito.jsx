import { useEffect, useMemo, useState } from "react";

export default function Carrito(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const key = "levelup_cart";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if(stored.length){
      const normalized = stored.map((i,idx)=>({ id:i.id || idx+1, name:i.product, price:i.price, quantity:i.qty||1, image:i.id||"" }));
      setItems(normalized);
    }else{
      setItems([
        { id:1, name:"PlayStation 5", price:549990, quantity:1, image:"PS5" },
        { id:2, name:"Auriculares Gamer HyperX Cloud II", price:79990, quantity:1, image:"Auriculares" },
        { id:3, name:"Mouse Gamer Logitech G502 HERO", price:49990, quantity:1, image:"Mouse" },
      ]);
    }
  },[]);

  useEffect(()=>{
    const key = "levelup_cart";
    const toSave = items.map(i=>({ id:i.id, product:i.name, price:i.price, category:"", qty:i.quantity }));
    localStorage.setItem(key, JSON.stringify(toSave));
  },[items]);

  function changeQuantity(index, delta){
    setItems(prev=>{
      const next=[...prev];
      next[index].quantity = Math.max(1, (next[index].quantity||1)+delta);
      return next;
    });
  }

  function updateQuantity(index, value){
    const qty = parseInt(value);
    setItems(prev=>{
      const next=[...prev];
      next[index].quantity = isNaN(qty) || qty<1 ? 1 : qty;
      return next;
    });
  }

  function removeItem(index){
    setItems(prev=> prev.filter((_,i)=>i!==index));
  }

  const { subtotal, discount, total } = useMemo(()=>{
    const st = items.reduce((acc,i)=> acc + i.price * i.quantity, 0);
    const dc = 0;
    const tt = st - dc;
    return { subtotal: st, discount: dc, total: tt };
  },[items]);

  return (
    <div className="container">
      <section className="cart-section">
        <div className="cart-header">
          <h2>Tu Carrito de Compras</h2>
          <span id="cart-count">{items.length} productos</span>
        </div>
        <div className="cart-items" id="cart-items">
          {items.map((item,index)=>(
            <div className="cart-item" key={item.id}>
              <div className="item-img">{item.image}</div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{formatCLP(item.price)} CLP</div>
                <div className="item-quantity">
                  <button className="quantity-btn" onClick={()=>changeQuantity(index,-1)}>-</button>
                  <input type="number" className="quantity-input" value={item.quantity} min={1} onChange={(e)=>updateQuantity(index, e.target.value)} />
                  <button className="quantity-btn" onClick={()=>changeQuantity(index,1)}>+</button>
                  <button className="remove-item" onClick={()=>removeItem(index)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span id="subtotal">{formatCLP(subtotal)} CLP</span>
          </div>
          <div className="summary-row">
            <span>Descuento:</span>
            <span id="discount">-{formatCLP(discount)} CLP</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total:</span>
            <span id="total">{formatCLP(total)} CLP</span>
          </div>
          <button className="btn btn-primary checkout-btn" id="checkout-btn" onClick={()=>alert('¡Gracias por tu compra!')}>Proceder al Pago</button>
        </div>
      </section>
    </div>
  );
}

function formatCLP(v){
  return `$${(v||0).toLocaleString('es-CL')}`;
}
