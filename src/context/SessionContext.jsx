import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SESSION_KEY = "levelup_session";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) setSession(JSON.parse(saved));
    } catch {}
  }, []);

  const login = (data) => {
    setSession(data);
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(() => ({ session, login, logout }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}
