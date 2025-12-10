import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("jwt_token");
      const savedSession = localStorage.getItem("user_session");
      if (savedToken && savedSession) {
        setToken(savedToken);
        setSession(JSON.parse(savedSession));
      }
    } catch {}
  }, []);

  const login = (userData, jwtToken) => {
    setSession(userData);
    setToken(jwtToken);
    localStorage.setItem("jwt_token", jwtToken);
    localStorage.setItem("user_session", JSON.stringify(userData));
  };

  const logout = () => {
    setSession(null);
    setToken(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_session");
  };

  const value = useMemo(() => ({ session, token, login, logout }), [session, token]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}
