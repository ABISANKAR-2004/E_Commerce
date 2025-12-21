import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Search,
  X,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import ReactPaginate from "react-paginate";
import { useApp } from "../context/AppContext";
import { useSearchParams, useNavigate } from "react-router-dom";

const Products = () => {
  const {
    getAllProducts,
    products,
    categories,
    totalPages,
    isLoggedIn,
    cartCount,
    navigate,
  } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // Fetch products whenever page changes
  useEffect(() => {
    getAllProducts(pageFromUrl);
  }, [getAllProducts, pageFromUrl]);

  // Toggle cart drawer
  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  // Pagination click
  const handlePageClick = ({ selected }) => {
    setSearchParams({ page: selected + 1 });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* Search & Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
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
              <option key={cat} value={cat}>{cat}</option>
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
                onClick={() => navigate(`/product/${product._id}`)}
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                <h3 className="text-lg font-semibold mt-1 mb-2">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
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

      {/* Pagination */}
      <section className="mb-4 overflow-x-hidden">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next ›"
          previousLabel="‹ Prev"
          onPageChange={handlePageClick}
          pageCount={totalPages}
          pageRangeDisplayed={window.innerWidth < 640 ? 2 : 5}
          marginPagesDisplayed={1}
          containerClassName="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-6 select-none"
          pageClassName="border rounded-md px-2 py-1 sm:px-3 sm:py-1 cursor-pointer hover:bg-blue-100 transition text-sm sm:text-base"
          pageLinkClassName="text-gray-700"
          activeClassName="bg-blue-600"
          activeLinkClassName="text-white"
          previousClassName="border rounded-md px-2 py-1 sm:px-3 cursor-pointer hover:bg-gray-100 text-sm sm:text-base"
          nextClassName="border rounded-md px-2 py-1 sm:px-3 cursor-pointer hover:bg-gray-100 text-sm sm:text-base"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakClassName="px-2 py-1 text-sm"
        />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
