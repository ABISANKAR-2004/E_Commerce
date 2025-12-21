import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import api from "../../services/api.jsx";
import { useNavigate } from "react-router-dom";

/* =========================================================
   CONTEXT CREATION
========================================================= */
const AppContext = createContext();

/* =========================================================
   APP PROVIDER
========================================================= */
export const AppProvider = ({ children }) => {
  /* ---------------- COOKIES ---------------- */
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "resetEmail",
  ]);

  /* ---------------- STATE ---------------- */
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  /* ---------------- ROUTER ---------------- */
  const navigate = useNavigate();

  /* ---------------- AUTH STATUS ---------------- */
  const isLoggedIn = Boolean(cookies.token);

  /* ---------------- STATIC DATA ---------------- */
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  /* =========================================================
     USER AUTHENTICATION
  ========================================================= */

  // ---------- LOGIN ----------
  const login = async (email, password) => {
    const res = await api.post("/user/login", { email, password });

    // store token for 7 days
    setCookie("token", res.data.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    setUser(res.data.user); // update user instantly
    navigate("/");
    return res;
  };

  // ---------- SIGNUP ----------
  const signup = async (name, email, phone, password) => {
    const res = await api.post("/user/signup", {
      name,
      email,
      phone,
      password,
    });

    navigate("/signin");
    return res;
  };

  // ---------- GET LOGGED-IN USER ----------
  const getUser = useCallback(async () => {
    const res = await api.get("/user/getuser", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setUser(res.data.user);
  }, [cookies.token]);

  // ---------- LOGOUT ----------
  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("resetEmail", { path: "/" });
    navigate("/");
  };

  /* =========================================================
     PASSWORD RESET
  ========================================================= */

  // ---------- SEND OTP ----------
  const sendOtp = async (email) => {
    try {
      const res = await api.post("/user/sendotp", { email });

      // save email temporarily (5 minutes)
      setCookie("resetEmail", email, { path: "/", maxAge: 300 });

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- VERIFY OTP ----------
  const verifyOtp = async (email, otp) => {
    try {
      email = email || cookies.resetEmail;
      const res = await api.post("/user/verifyotp", { email, otp });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- UPDATE PASSWORD ----------
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

  /* =========================================================
     PRODUCTS
  ========================================================= */

  // ---------- GET ALL PRODUCTS ----------
  const getAllProducts = useCallback(async () => {
    try {
      const res = await api.get("/product/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /* =========================================================
     CART
  ========================================================= */

  // ---------- GET CART ITEMS (FIXED WITH useCallback) ----------
  const getCartItems = useCallback(async () => {
    try {
      const res = await api.get("/cart/find", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.log(err);
    }
  }, [cookies.token]);

// ---------- ADD / UPDATE CART ----------
const addToCart = async ({ product, qty }) => {
  try {
    if (qty <= 0) {
      // remove if quantity is zero
      const cartItem = cartItems.find(
        (i) => i.product._id === product._id
      );
      if (cartItem) {
        await removeFromCart(cartItem._id);
      }
      return;
    }

    await api.post(
      "/cart/add",
      { productId: product._id, quantity: qty },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );

    getCartItems();
  } catch (err) {
    console.log(err);
  }
};

  // ---------- REMOVE FROM CART ----------
  const removeFromCart = async (id) => {
    try {
      
      await api.delete(`/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      getCartItems(); // refresh cart
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- CART COUNT ----------
  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // ---------- TOTAL PRICE ----------
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.product?.price ?? item.price ?? 0;
        const qty = item.qty ?? item.quantity ?? 1;
        return total + price * qty;
      }, 0)
      .toFixed(2);
  };

  /* =========================================================
     EFFECTS
  ========================================================= */

  // load products once
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // load user & cart when token changes
  useEffect(() => {
    if (cookies.token) {
      getUser();
      getCartItems();
    }
  }, [cookies.token, getUser, getCartItems]);

  /* =========================================================
     PROVIDER VALUE
  ========================================================= */
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
        navigate,
        addToCart,
        removeFromCart,
        cartCount,
        getTotalPrice,
        cartItems,
        products,
        categories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* =========================================================
   CUSTOM HOOK
========================================================= */
export const useApp = () => useContext(AppContext);
