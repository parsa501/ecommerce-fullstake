import { createContext, useState } from "react";
export const AuthContext=createContext();
export default function AuthContextProvider({ children }) {
    const tokenStorage=localStorage.getItem('token')
    const [token,setToken]=useState(tokenStorage);
    const handleToken=(tk)=>{
        if(tk){
            localStorage.setItem('token',tk);
        }else{
            localStorage.removeItem('token');
        }
        setToken(tk);
    }
  return (
    <AuthContext.Provider value={{ token, handleToken }}>
      {children}
    </AuthContext.Provider>
  )
}

