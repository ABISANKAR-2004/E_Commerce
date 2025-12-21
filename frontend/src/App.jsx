import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthPages from "./pages/AuthPages.jsx";
import OTPVerify from "./pages/Otpverify.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<AuthPages />} />
        <Route path="/verify" element={<OTPVerify />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
