import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import api from "../../services/api.jsx";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [cookies, setCookie, removeCookie] = useCookies(["token", "resetEmail"]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const isLoggedIn = Boolean(cookies.token);

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    const res = await api.post("/user/login", { email, password });

    setCookie("token", res.data.token, { path: "/" });
    setUser(res.data.user); // ✅ update user immediately
    navigate("/");
    return res;
  };

  // ---------------- SIGNUP ----------------
  const signup = async (name, email, phone, password) => {
    const res = await api.post("/user/signup", { name, email, phone, password });
    navigate("/signin");
    return res;
  };

  // ---------------- GET USER ----------------
  const getUser = useCallback(async () => {
    const res = await api.get("/user/getuser", {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setUser(res.data.user);
  }, [cookies.token]);

  // ---------------- LOGOUT ----------------
  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("resetEmail", { path: "/" });
    navigate("/");
  };

  // ---------------- SEND OTP ----------------
  const sendOtp = async (email) => {
    try {
      const res = await api.post("/user/sendotp", { email });
       // ✅ store email ONLY after successful verification
      setCookie("resetEmail", email, { path: "/", maxAge: 300 });
      
      return res; // ✅ ALWAYS return

    } catch (err) {
      console.log(err) // ✅ IMPORTANT
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async (email, otp) => {
    try {
     email= email || cookies.resetEmail;
      const res = await api.post("/user/verifyotp", { email:email, otp:otp });

     
      return res;
    } catch (err) {
      console.log(err)
    }
  };

  // ---------------- UPDATE PASSWORD ----------------
  const updatepwd = async (password) => {
    try {
      const res = await api.put("/user/updatepwd", {
        email: cookies.resetEmail,
        password,
      });

      removeCookie("resetEmail", { path: "/" });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    if (cookies.token) {
      getUser();
    }
  }, [cookies.token, getUser]);

  return (
    <AppContext.Provider
      value={{
        login,
        signup,
        logout,
        isLoggedIn,
        user,
        sendOtp,
        verifyOtp,
        updatepwd,
        navigate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
