import React, { useState } from "react";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, LogIn } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";
import CartDrawer from "../components/CartDrawer";

const Products = () => {
  const {
    isLoggedIn,
    
    addToCart,
    
    cartCount,
   
    navigate,
    products,
    categories,
    
  } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const product = {
    id: 101,
    name: "Premium Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  };
  
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      {/* Cart Sidebar (same as Home) */}
      {/* {showCart && (
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
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4 mb-4"
                  >
                    <img
                      src={item.image}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-blue-600">${item.price}</p>
                    </div>
                    <X
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(index)}
                    />
                  </div>
                ))}

                <div className="mt-6 font-bold text-xl flex justify-between">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}
      <CartDrawer 
      isOpen={showCart}
      onClose={()=>setShowCart(false)}
      />

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                onClick={() => navigate(`/product/${product._id}`)}

                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold mt-1 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
