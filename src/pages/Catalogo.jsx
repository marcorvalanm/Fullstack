import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

const CATEGORIES = [
  { key:"all", label:"Todos" },
  { key:"consolas", label:"Consolas" },
  { key:"pc", label:"PC" },
  { key:"sillas", label:"Sillas Gamer" },
  { key:"accesorios", label:"Accesorios" },
  { key:"juegos", label:"Juegos de mesa" },
  { key:"poleras", label:"Poleras personalizadas" },
];

export default function Catalogo(){
  const [category, setCategory] = useState("all");

  useEffect(()=>{ window.scrollTo(0,0); },[]);

  const items = useMemo(()=>{
    if(category === "all") return PRODUCTS;
    return PRODUCTS.filter(p=>p.category===category);
  },[category]);

  function addToCart(product){
    try{
      const key = "levelup_cart";
      const cart = JSON.parse(localStorage.getItem(key) || "[]");
      cart.push({ id:product.id, product:product.title, price:product.price, category:product.category, qty:1 });
      localStorage.setItem(key, JSON.stringify(cart));
      alert(`${product.title} agregado al carrito ✅`);
    }catch{}
  }

  return (
    <div className="container">
      <h1>Catálogo de Productos</h1>

      <div className="filters" id="filters">
        {CATEGORIES.map(c => (
          <button key={c.key} data-category={c.key} className={category===c.key?"active":""} onClick={()=>setCategory(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid" id="productos">
        {items.map(p => (
          <div className="card" data-category={p.category} key={p.id}>
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <Link to={`/producto/${p.id}`} className="btn-vermas">Ver más</Link>
            <div className="meta">{labelForCategory(p.category)}</div>
            <p></p>
            <div className="price">{formatCLP(p.price)} CLP</div>
            <button className="btn-add" onClick={()=>addToCart(p)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function labelForCategory(key){
  const map = {
    consolas:"Consola",
    pc:"Computador",
    accesorios:"Accesorio",
    juegos:"Juego de mesa",
    poleras:"Polera personalizada",
    sillas:"Silla Gamer"
  };
  return map[key]||key;
}

function formatCLP(v){
  return `$${(v||0).toLocaleString('es-CL')}`;
}
