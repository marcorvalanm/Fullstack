import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const DB_KEY = "levelup_users";

function loadUsers(){ try{ return JSON.parse(localStorage.getItem(DB_KEY)||"[]"); }catch{ return []; } }
function saveUsers(list){ try{ localStorage.setItem(DB_KEY, JSON.stringify(list)); }catch{} }

export default function Login(){
  const { login } = useSession();
  const nav = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "login";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isDuoc, setIsDuoc] = useState(false);
  const [msg, setMsg] = useState("");

  const title = useMemo(()=> mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión', [mode]);

  function onSubmit(e){
    e.preventDefault();
    if(mode === 'register'){
      const users = loadUsers();
      if(users.some(u=>u.email===email)){
        setMsg('El correo ya está registrado');
        return;
      }
      users.push({ email, name, isDuoc, pref:"", password });
      saveUsers(users);
      login({ email });
      nav("/");
    } else {
      const users = loadUsers();
      const u = users.find(u=>u.email===email && u.password===password);
      if(!u){ setMsg('Credenciales inválidas'); return; }
      login({ email });
      nav("/");
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <h1>{title}</h1>
        <div className="card">
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

            {mode === 'register' && (
              <>
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" value={name} onChange={e=>setName(e.target.value)} required />

                <label><input type="checkbox" checked={isDuoc} onChange={e=>setIsDuoc(e.target.checked)} /> ¿Correo Duoc? (20% off)</label>
              </>
            )}

            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />

            <div style={{display:'flex',gap:8}}>
              <button type="submit">{mode==='register'?'Registrarse':'Iniciar sesión'}</button>
              <button type="button" className="ghost" onClick={()=> nav(mode==='register'?'/login?mode=login':'/login?mode=register') }>
                {mode==='register'?'Ya tengo cuenta':'Crear cuenta nueva'}
              </button>
            </div>

            {msg && <div className="error" style={{marginTop:8}}>{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
