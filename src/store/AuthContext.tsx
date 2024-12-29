import React, { createContext, useState, useContext } from "react";
import { TOKEN } from "../constants/Common";
interface IAuthContext {
  getAccessToken: () => string | null;
  isAuthenticated: () => boolean;
  setAccessToken: (token: string | null) => void;
  setAccessTokenWithoutRerender: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [rerenderToggle, setToggle] = useState(false); // HACK: can't figure out GoogleCallback component T_T  - poor you :(

  const setAccessToken = (token: string | null) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToggle(!rerenderToggle);
  };

  const setAccessTokenWithoutRerender = (token: string | null) => {
    localStorage.setItem("token", JSON.stringify(token));
  };

  const getAccessToken = (): string | null => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) return JSON.parse(storedToken);
    return null;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
  };

  const isAuthenticated = () => {
    return getAccessToken() !== null;
  };

  return (
    <AuthContext.Provider value={{getAccessToken, isAuthenticated, setAccessToken, setAccessTokenWithoutRerender, logout}}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export {AuthProvider, useAuth};
