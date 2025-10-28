import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const DB_KEY = "levelup_users";
const REF_CODES = { "LEVEL100": 100, "AMIGO50": 50 };

function computeLevel(points){
  if(points >= 1000) return 3; // 10%
  if(points >= 500) return 2;  // 5%
  return 1;                     // 0%
}

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
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [refCode, setRefCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isDuoc, setIsDuoc] = useState(false);
  const [msg, setMsg] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const redirectRef = useRef(null);

  const title = useMemo(()=> mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión', [mode]);
  const maxDob = useMemo(()=>{
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    const iso = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
    return iso.split('T')[0];
  },[]);

  // Redirige si ya hay sesión activa (no interrumpan el popup!!!!)
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
      if(!name.trim()) { setMsg('Ingresa tu nombre'); return; }
      if(!lastName.trim()) { setMsg('Ingresa tu apellido'); return; }
      if(!birthDate){ setMsg('Selecciona tu fecha de nacimiento'); return; }
      // Validación 18+
      const dob = new Date(birthDate + 'T00:00:00');
      if(Number.isNaN(dob.getTime())){ setMsg('Fecha de nacimiento inválida'); return; }
      const today = new Date();
      const eighteen = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      if(dob > eighteen){
        setMsg('Debes ser mayor de 18 años para registrarte');
        return;
      }
      // Código de referido (opcional)
      const code = refCode.trim().toUpperCase();
      if(refCode && !REF_CODES[code]){ setMsg('Código de referido inválido'); return; }
      const users = loadUsers();
      if(users.some(u=>u.email===emailTrim)){
        setMsg('El correo ya está registrado');
        return;
      }
      const initialPoints = code ? REF_CODES[code] : 0;
      const level = computeLevel(initialPoints);
      users.push({ email: emailTrim, name, apellido: lastName, fechaNacimiento: birthDate, isDuoc, pref:"", password: passTrim, refCode: code||"", points: initialPoints, level });
      saveUsers(users);
      login({ email: emailTrim });
      setWelcomeName(name);
      setShowWelcome(true);
      redirectRef.current = setTimeout(()=>{ nav("/"); }, 3000);
    } else {
      const users = loadUsers();
      const u = users.find(u=>u.email===emailTrim && u.password===passTrim);
      if(!u){ setMsg('Credenciales inválidas'); return; }
      const duoc = /@duocuc\.cl$/i.test(emailTrim);
      if(u.isDuoc !== duoc){
        const idx = users.findIndex(x=>x.email===emailTrim);
        if(idx>=0){
          users[idx] = { ...users[idx], isDuoc: duoc };
          saveUsers(users);
        }
      }
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

                <label htmlFor="lastname">Apellido</label>
                <input id="lastname" type="text" value={lastName} onChange={e=>setLastName(e.target.value)} required />

                <label htmlFor="dob">Fecha de nacimiento</label>
                <input id="dob" type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} max={maxDob} required />

                {isDuoc && <div className="hint">Descuento 20% aplicado por correo Duoc</div>}
                <div className="hint">Descuentos LevelUp y DUOC no son acumulables; se aplica el mayor.</div>

                <label htmlFor="ref">Código de referido (opcional)</label>
                <input id="ref" type="text" value={refCode} onChange={e=>setRefCode(e.target.value)} placeholder="Ej: LEVEL100 / AMIGO50" />
              </>
            )}

            <label htmlFor="password">Contraseña</label>
            <div className="field-wrap">
              <input id="password" type={showPass? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="button" className="field-icon" aria-label={showPass? 'Ocultar contraseña':'Mostrar contraseña'} onClick={()=>setShowPass(s=>!s)}>{showPass?'🙈':'👁'}</button>
            </div>

            <div style={{display:'flex',gap:8, justifyContent:'center'}}>
              <button type="submit">{mode==='register'?'Registrarse':'Iniciar sesión'}</button>
              <button type="button" className="ghost neon" onClick={()=> nav(mode==='register'?'/login?mode=login':'/login?mode=register') }>
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
