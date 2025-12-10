import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { api } from "../services/api";

function computeLevel(points){
  const pts = Number(points||0);
  if(pts >= 1000) return 3;
  if(pts >= 500) return 2;
  return 1;
}

export default function Perfil(){
  const { session, logout, token } = useSession();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [prefMsg, setPrefMsg] = useState("");
  const [name, setName] = useState("");
  const [pref, setPref] = useState("");

  useEffect(()=>{
    if(!session || !token){
      alert("Debes iniciar sesión primero");
      navigate("/login?mode=login");
      return;
    }
    
    setName(session.name || "");
    setPref(session.pref || "");
  },[session, token, navigate]);

  const benefits = useMemo(()=>{
    if(session?.isDuoc){
      return <span className="success">Descuento activo: 20% (correo Duoc)</span>;
    }
    return <span className="hint">Sin beneficios especiales.</span>;
  },[session]);

  const levelInfo = useMemo(()=>{
    const pts = Number(session?.points||0);
    const lvl = session?.level || computeLevel(pts);
    return { lvl, pts };
  },[session]);

  function onSaveProfile(e){
    e.preventDefault();
    const users = loadUsers();
    const idx = users.findIndex(x=>x.email===session.email);
    if(idx>=0){
      users[idx] = { ...users[idx], name };
      saveUsers(users);
      setMsg("Datos personales actualizados ✅");
      setTimeout(()=>setMsg(""), 2500);
    }
  }

  function onSavePref(e){
    e.preventDefault();
    const users = loadUsers();
    const idx = users.findIndex(x=>x.email===session.email);
    if(idx>=0){
      users[idx] = { ...users[idx], pref };
      saveUsers(users);
      setPrefMsg("Preferencia guardada ✅");
      setTimeout(()=>setPrefMsg(""), 2500);
    }
  }

  const comprasDemo = [
    {producto:"Teclado Mecánico RGB",fecha:"2025-05-21",monto:"$59.990"},
    {producto:"Silla Gamer Pro",fecha:"2025-06-10",monto:"$149.990"},
    {producto:"Monitor 144Hz",fecha:"2025-08-01",monto:"$199.990"}
  ];

  if(!session || !user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Perfil de Usuario</h1>

        <div className="card">
          <h2>Información Personal</h2>
          <form onSubmit={onSaveProfile} id="form-profile">
            <label htmlFor="p-name">Nombre <span style={{marginLeft:8, fontSize:12, padding:'2px 8px', borderRadius:999, background:'rgba(57,255,20,0.12)', border:'1px solid rgba(57,255,20,0.45)'}} title={`Puntos: ${levelInfo.pts}`}>Nivel {levelInfo.lvl}</span></label>
            <input id="p-name" type="text" value={name} onChange={e=>setName(e.target.value)} />

            <label htmlFor="p-email">Correo</label>
            <input id="p-email" type="email" value={user.email} disabled />

            <div id="benefits" className="hint">{benefits}</div>
            <button type="submit">Guardar cambios</button>
            <div id="profile-result" className="hint">{msg}</div>
          </form>
        </div>

        <div className="card">
          <h2>Gestión de Preferencias</h2>
          <form onSubmit={onSavePref} id="form-preferencias">
            <label htmlFor="p-pref">Selecciona tu categoría favorita</label>
            <select id="p-pref" value={pref} onChange={e=>setPref(e.target.value)}>
              <option value="">-- Ninguna --</option>
              <option value="consolas">Consolas</option>
              <option value="pc">PC</option>
              <option value="accesorios">Accesorios</option>
            </select>
            <button type="submit">Guardar Preferencia</button>
            <div id="pref-result" className="hint">{prefMsg}</div>
          </form>
        </div>

        <div className="card">
          <h2>Historial de Compras</h2>
          <table id="tabla-compras">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {comprasDemo.map((c,i)=> (
                <tr key={i}><td>{c.producto}</td><td>{c.fecha}</td><td>{c.monto}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <button id="logout" className="ghost" onClick={()=>{ logout(); navigate('/'); }}>Cerrar Sesión</button>
      </div>
    </div>
  );
}
