import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ForgotPassword = () => {
  
  const {navigate,sendOtp} = useApp();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    await sendOtp(email).then((result) => {
        if(result.status===200){
        setIsSubmitting(false);
        setIsSuccess(true);
        navigate("/verify");}
    }).catch((err) => {
        alert(err);
        setIsSubmitting(false);
        setIsSuccess(false);
        
    });


  /*   // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000); */
  };

  const handleBackToLogin = () => {
    navigate("/signin")
  };

  const handleResendEmail = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Reset link has been resent to your email!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackToLogin}
              className="flex items-center space-x-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Login</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-black">ShopHub</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {!isSuccess ? (
            <>
              {/* Page Title */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Forgot Password?</h1>
                <p className="text-white text-opacity-90">
                  No worries! Enter your email and we'll send you reset instructions
                </p>
              </div>

              {/* Email Form Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          error
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {error && (
                      <div className="mt-2 flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> We'll send a password reset link to your registered email address. 
                      Please check your spam folder if you don't receive it within a few minutes.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transform'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or</span>
                    </div>
                  </div>

                  {/* Back to Login Link */}
                  <button
                    onClick={handleBackToLogin}
                    className="w-full text-center text-gray-600 hover:text-gray-800 font-semibold transition"
                  >
                    Remember your password? <span className="text-blue-600">Sign in</span>
                  </button>
                </div>
              </div>

              
            </>
          ) : (
            // Success State
            <>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  {/* Success Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>

                  {/* Success Message */}
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Check Your Email</h2>
                  <p className="text-gray-600 mb-2">
                    We've sent a password reset link to
                  </p>
                  <p className="text-blue-600 font-semibold mb-6">
                    {email}
                  </p>

                  {/* Instructions */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-gray-700 font-semibold mb-2">Next steps:</p>
                    <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                      <li>Check your email inbox</li>
                      <li>Click the reset password link</li>
                      <li>Create a new secure password</li>
                      <li>Sign in with your new password</li>
                    </ol>
                  </div>

                  {/* Resend Button */}
                  <button
                    onClick={handleResendEmail}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mb-4"
                  >
                    Resend Email
                  </button>

                  {/* Back to Login */}
                  <button
                    onClick={handleBackToLogin}
                    className="w-full text-gray-600 hover:text-gray-800 font-semibold transition"
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>

              {/* Email Tips */}
              <div className="mt-6 bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30">
                <p className="text-white text-sm text-opacity-90">
                  <strong>Didn't receive the email?</strong> Check your spam or junk folder, 
                  or try adding noreply@shophub.com to your contacts.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 text-center">
        <p className="text-white text-sm opacity-80">
          © 2025 ShopHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;