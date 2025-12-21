import React, { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";
import { useParams } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";

const ProductDetail = () => {
  const {
    isLoggedIn,
    addToCart,
    cartItems,
    products,
    cartCount,
    navigate,
    
  } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(0);

  const { id } = useParams();

  // ✅ get product FIRST
  const product = products.find((p) => p._id === id);

  // ✅ sync quantity from cart
useEffect(() => {
  if (!product || !cartItems.length) return;

  const cartProduct = cartItems.find(
    (i) => i.product?._id === product._id
  );

  setQty(cartProduct ? cartProduct.quantity : 0);
}, [cartItems, product]);


  if (!product) return null;

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  const handleIncrease = () => setQty((c) => c + 1);
  const handleDecrease = () => setQty((c) => Math.max(0, c - 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      {/* ================= CART SIDEBAR ================= */}
{/*       {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <X onClick={() => setShowCart(false)} className="cursor-pointer" />
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 border-b pb-4"
                    >
                      <img
                        src={item.product?.image}
                        alt={item.product?.title}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.product?.title}
                        </h3>
                        <p className="text-blue-600 font-bold">
                          ${item.product?.price} × {item?.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item?._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}
      <CartDrawer
      isOpen={showCart}
      onClose={() => setShowCart(false)}
    />

      {/* ================= PRODUCT DETAIL ================= */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-cover rounded"
          />

          <div>
            <span className="text-sm text-gray-500 uppercase">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>

            <p className="text-3xl text-blue-600 font-bold mt-6">
              ₹{product.price}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleDecrease}
                className="p-2 border rounded"
                disabled={qty === 0}
              >
                <Minus />
              </button>

              <span className="text-xl font-bold">{qty}</span>

              <button
                onClick={handleIncrease}
                className="p-2 border rounded"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={() => addToCart({ product, qty })}
              className="mt-6 w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
