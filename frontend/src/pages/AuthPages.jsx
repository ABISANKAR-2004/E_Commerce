import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const AuthPages = () => {
  const { login, signup } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ This function MUST be triggered via <form onSubmit>
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload

    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert('Please fill in all required fields!');
        return;
      }
      login(formData.email, formData.password);
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobileNumber ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        alert('Please fill in all required fields!');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number!');
        return;
      }

      signup(
        formData.name,
        formData.email,
        formData.mobileNumber,
        formData.password
      );
      setIsLogin(true);
    }

    // Reset form after submit
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: ''
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">ShopHub</h1>
          <p className="text-white text-opacity-90 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Toggle Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                isLogin
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                !isLogin
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* ✅ FORM WRAPPER (IMPORTANT FIX) */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Mobile */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            )}

            {/* ✅ SUBMIT BUTTON */}
            <button
              type="submit" // IMPORTANT: form controls submission
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <span>{isLogin ? 'Login' : 'Create Account'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Toggle Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={toggleAuthMode} className="text-blue-600 font-semibold">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

        <p className="text-center text-white text-sm mt-6 opacity-80">
          © 2025 AIT. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthPages;
