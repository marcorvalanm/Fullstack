import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const DB_KEY = "levelup_users";

function loadUsers(){ try{ return JSON.parse(localStorage.getItem(DB_KEY)||"[]"); }catch{ return []; } }
function saveUsers(list){ try{ localStorage.setItem(DB_KEY, JSON.stringify(list)); }catch{} }

export default function Login(){
  const { login, session } = useSession();
  const nav = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "login";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isDuoc, setIsDuoc] = useState(false);
  const [msg, setMsg] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const redirectRef = useRef(null);

  const title = useMemo(()=> mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión', [mode]);

  // Redirige si ya hay sesión activa (pero no interrumpas el popup)
  useEffect(()=>{
    if(session && !showWelcome){ nav("/"); }
  },[session, nav, showWelcome]);

  // Auto-marca DUOC si el correo termina en @duocuc.cl
  useEffect(()=>{
    const v = email.trim().toLowerCase();
    setIsDuoc(/@duocuc\.cl$/.test(v));
  },[email]);

  function onSubmit(e){
    e.preventDefault();
    const emailTrim = email.trim();
    const passTrim = password.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)){
      setMsg('Ingresa un correo válido');
      return;
    }
    if(passTrim.length < 6){
      setMsg('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if(mode === 'register'){
      const users = loadUsers();
      if(users.some(u=>u.email===emailTrim)){
        setMsg('El correo ya está registrado');
        return;
      }
      users.push({ email: emailTrim, name, isDuoc, pref:"", password: passTrim });
      saveUsers(users);
      login({ email: emailTrim });
      setWelcomeName(name);
      setShowWelcome(true);
      redirectRef.current = setTimeout(()=>{ nav("/"); }, 3000);
    } else {
      const users = loadUsers();
      const u = users.find(u=>u.email===emailTrim && u.password===passTrim);
      if(!u){ setMsg('Credenciales inválidas'); return; }
      login({ email: emailTrim });
      setShowWelcome(true);
      redirectRef.current = setTimeout(()=>{ nav("/"); }, 3000);
    }
  }

  function dismissWelcome(){
    if(redirectRef.current){ try{ clearTimeout(redirectRef.current); }catch{} }
    setShowWelcome(false);
    nav("/");
  }

  return (
    <div className="login-page">
      <div className="container">
        <h1>{title}</h1>
        <div className="card" style={{margin:'0 auto'}}>
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

            <div style={{display:'flex',gap:8, justifyContent:'center'}}>
              <button type="submit">{mode==='register'?'Registrarse':'Iniciar sesión'}</button>
              <button type="button" className="ghost" onClick={()=> nav(mode==='register'?'/login?mode=login':'/login?mode=register') }>
                {mode==='register'?'Ya tengo cuenta':'Crear cuenta nueva'}
              </button>
            </div>

            {msg && <div className="error" style={{marginTop:8}}>{msg}</div>}
          </form>
        </div>
      </div>

      {showWelcome && (
        <div className="toast-overlay" role="dialog" aria-live="assertive">
          <div className="toast-box">
            <img src="/img/consolito.png" alt="Gamepad" className="toast-img" onError={(e)=>{ e.currentTarget.src='/img/gamepad_welcome.svg'; }} />
            <h2 className="welcome-title">{`¡Bienvenido/a ${welcomeName} a Level-Up ⸜(｡˃ ᵕ ˂ )⸝!`}</h2>
            <button type="button" className="toast-close" onClick={dismissWelcome} aria-label="Cerrar">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
