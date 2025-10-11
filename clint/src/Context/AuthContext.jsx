import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleToken = (tk) => {
    if (tk) {
      localStorage.setItem("token", tk);
      setToken(tk);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, handleToken }}>
      {children}
    </AuthContext.Provider>
  );
}
