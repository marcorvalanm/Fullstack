import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { api } from "../services/api";

const REF_CODES = { "LEVEL100": 100, "AMIGO50": 50 };

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
  const [isLoading, setIsLoading] = useState(false);
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

  async function onSubmit(e){
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
    
    setIsLoading(true);
    setMsg("");
    
    try {
      if(mode === "register"){
        if(!name.trim()) { setMsg('Ingresa tu nombre'); setIsLoading(false); return; }
        if(!lastName.trim()) { setMsg('Ingresa tu apellido'); setIsLoading(false); return; }
        if(!birthDate){ setMsg('Selecciona tu fecha de nacimiento'); setIsLoading(false); return; }
        
        const dob = new Date(birthDate + 'T00:00:00');
        if(Number.isNaN(dob.getTime())){ setMsg('Fecha de nacimiento inválida'); setIsLoading(false); return; }
        
        const today = new Date();
        const eighteen = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if(dob > eighteen){
          setMsg('Debes ser mayor de 18 años para registrarte');
          setIsLoading(false);
          return;
        }
        
        const code = refCode.trim().toUpperCase();
        if(refCode && !REF_CODES[code]){ setMsg('Código de referido inválido'); setIsLoading(false); return; }
        
        const userData = {
          email: emailTrim,
          password: passTrim,
          name,
          lastName,
          birthDate,
          duoc: isDuoc,
          refCode: code || ""
        };
        
        const response = await api.register(userData);
        login(response.user, response.token);
        setWelcomeName(name);
        setShowWelcome(true);
        redirectRef.current = setTimeout(()=>{ nav("/"); }, 3000);
      } else {
        const response = await api.login(emailTrim, passTrim);
        login(response.user, response.token);
        setWelcomeName(response.user.name);
        setShowWelcome(true);
        redirectRef.current = setTimeout(()=>{ nav("/"); }, 3000);
      }
    } catch (error) {
      setMsg(error.message || 'Error en la autenticación');
    } finally {
      setIsLoading(false);
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
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Procesando...' : (mode==='register'?'Registrarse':'Iniciar Sesión')}
              </button>
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
