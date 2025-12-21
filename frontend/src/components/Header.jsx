import React, { useRef, useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

/*
  Header Component
  👉 Contains ALL header UI + logic
  👉 Receives required states & setters from Home
  👉 NO logic is changed, only relocated
*/
const Header = ({
  cartCount,
  onCartClick
}) => {
const profileRef = useRef(null);
const {isLoggedIn,logout} = useApp();

const [showProfileMenu, setShowProfileMenu] = useState(false);
const [showMobileMenu, setShowMobileMenu] = useState(false);

//logout 

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowProfileMenu]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              ShopHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="nav-link">Home</a>
            <a href="/products" className="nav-link">Products</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {isLoggedIn ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <LogIn className="w-5 h-5 text-white" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  {isLoggedIn ? (
                    <>
                      <a className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <a
                      href="/signin"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sign In
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 border-t pt-4">
            <a className="block py-2 hover:text-blue-600" href="/">Home</a>
            <a className="block py-2 hover:text-blue-600" href="#products">Products</a>
            <a className="block py-2 hover:text-blue-600" href="#about">About</a>
            <a className="block py-2 hover:text-blue-600" href="#contact">Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
