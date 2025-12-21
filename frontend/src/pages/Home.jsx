import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
//import { useCookies } from "react-cookie";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import CartDrawer from "../components/CartDrawer";

const Home = () => {
  /* =========================================================
     CONTEXT & STATE
  ========================================================= */
  const {
    isLoggedIn,  
    navigate,
    cartCount,
    products,
    categories,    
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
 

  //const [cookies] = useCookies(["token"]);
 // const profileRef = useRef(null);


  /* =========================================================
     FILTERED PRODUCTS BASED ON SEARCH & CATEGORY
  ========================================================= */
  const filteredProducts = products.slice(products.length-8,products.length).filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* =========================================================
     HANDLERS
  ========================================================= */

  // Toggle cart sidebar
  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access your cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  /* =========================================================
     RENDER COMPONENT
  ========================================================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      {/* Cart Sidebar */}

      <CartDrawer 
      isOpen={showCart}
      onClose={()=>setShowCart(false)}
      />
   {/*   {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <>*/}
                {/* Cart Items */}
            {/*    <div className="space-y-4">
                {cartItems.map((item) => (
                <div key={item?.id} className="flex items-center space-x-4 border-b pb-4">
                <img onClick={()=>{navigate(`/product/${item.product?._id}`)}}
                  src={item.product?.image}
                  alt={item.product?.title}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product?.title}</h3>
                  <p className="text-blue-600 font-bold">
                    ${item.product?.price} × {item?.quantity}
                  </p>
                >
  */}           {/* Quantity Controls */}
                  
             {/*    </div> */}

                {/* Remove Button */}
                {/* <button
                  onClick={() => removeFromCart(item?._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div> */}
                {/* Cart Total & Checkout */}
                {/* <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Search & Filter Section */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">
                  {product.category}
                </span>
                
                <h3 className="text-lg font-semibold mt-1 mb-2">
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
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

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            ShopHub is your one-stop destination for quality products across
            multiple categories. We're committed to providing the best shopping
            experience with competitive prices, fast shipping, and excellent
            customer service.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                onClick={() => alert("Message sent!")}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;