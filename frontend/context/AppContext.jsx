import React, { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import api from "../services/api.jsx";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(cookies.token);

  const login = async (email, password) => {
    try {
      const user = await api.post("/user/login", { email, password });
      const token = user.data.token;

      setCookie("token", token, { path: "/" });
      navigate("/");
      alert(user.data.message);
    } catch (error) {
      console.log(error);
    }
  };
 
  const signup = async(name,email,phone,password)=>{
     const user = await api.post("/user/signup",{name,email,phone,password});
     alert(user.data.message)
     navigate("/signin")

  }

  const logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
    alert("logged out Successfylly");
  };

  return (
    <AppContext.Provider value={{ login, logout, isLoggedIn , signup}}>
      {children}
    </AppContext.Provider>
  );
};

/* ---------- CUSTOM HOOK ---------- */
export const useApp = () => useContext(AppContext);
