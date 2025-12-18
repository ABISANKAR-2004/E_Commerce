import React, { useState, useRef } from "react";
import { Lock, ArrowRight, RefreshCw, CheckCircle, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

const OTPVerify = () => {
  const { user, verifyOtp,navigate } = useApp();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  /* useEffect(() => {
    
  },);
 */
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex].focus();
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }
    await verifyOtp(user.email, otpValue)
      .then((result) => {
        if (result.status === 200) {
          setIsVerifying(false);
          setIsVerified(true);
          navigate("/updatepassword")
        }
      })
      .catch((err) => {
        console.log(err);
        setIsVerifying(false);
        setIsVerified(false);
      });
  };
  // // Simulate API call
  // setTimeout(() => {
  //   setIsVerifying(false);
  //
  //   alert(`OTP Verified Successfully!\nOTP: ${otpValue}`);

  // }, 1500);

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Verify Your Account</h1>
          <p className="text-white text-opacity-90 mt-2">
            We've sent a verification code to
          </p>
          <p className="text-white font-semibold mt-1">{user.email}</p>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!isVerified ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Enter OTP Code
                </h2>
                <p className="text-gray-600 text-sm">
                  Please enter the 6-digit code sent to your email
                </p>
              </div>

              {/* OTP Input Boxes */}
              <div className="flex justify-center space-x-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isComplete || isVerifying}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition ${
                  isComplete && !isVerifying
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transform"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verified Successfully!
              </h2>
              <p className="text-gray-600">Your account has been verified</p>
            </div>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button className="text-white text-sm hover:underline">
            ← Back to Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6 opacity-80">
          © 2025 ShopHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default OTPVerify;
