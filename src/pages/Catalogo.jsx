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
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(()=>{ window.scrollTo(0,0); },[]);

  const items = useMemo(()=>{
    let list = PRODUCTS;
    // Filtro categoría
    if(category !== "all"){ list = list.filter(p=>p.category===category); }
    // Filtro nombre (contiene, sin mayúsculas)
    const q = search.trim().toLowerCase();
    if(q){ list = list.filter(p=> p.title.toLowerCase().includes(q)); }
    // Filtros de precio (inclusive)
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);
    if(min !== null && !Number.isNaN(min)){ list = list.filter(p=> p.price >= min); }
    if(max !== null && !Number.isNaN(max)){ list = list.filter(p=> p.price <= max); }
    return list;
  },[category, search, minPrice, maxPrice]);

  function addToCart(product){
    try{
      const key = "levelup_cart";
      const cart = JSON.parse(localStorage.getItem(key) || "[]");
      const idx = cart.findIndex(i => i.id === product.id);
      if(idx >= 0){
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({ id:product.id, product:product.title, price:product.price, category:product.category, qty:1, img: product.img });
      }
      localStorage.setItem(key, JSON.stringify(cart));
      window.dispatchEvent(new Event("levelup_cart_updated"));
      alert(`${product.title} agregado al carrito ✅`);
    }catch{}
  }

  return (
    <div className="container">
      <h1>Catálogo de Productos</h1>

      <div className="filters" id="filters">
        <details>
          <summary>Filtros</summary>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'0.75rem', marginTop:'0.75rem'}}>
            <label>
              Categoría
              <select
                aria-label="Filtrar por categoría"
                value={category}
                onChange={e=>setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </label>

            <label>
              Nombre producto
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={search}
                onChange={e=>setSearch(e.target.value)}
                aria-label="Buscar por nombre"
              />
            </label>

            <label>
              Precio mínimo
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={e=>setMinPrice(e.target.value)}
                aria-label="Precio mínimo"
                min={0}
              />
            </label>

            <label>
              Precio máximo
              <input
                type="number"
                placeholder="999999"
                value={maxPrice}
                onChange={e=>setMaxPrice(e.target.value)}
                aria-label="Precio máximo"
                min={0}
              />
            </label>

            <div style={{display:'flex', alignItems:'end', justifyContent:'center'}}>
              <button className="btn" onClick={()=>{ setCategory("all"); setSearch(""); setMinPrice(""); setMaxPrice(""); }}>Limpiar</button>
            </div>
          </div>
        </details>
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
