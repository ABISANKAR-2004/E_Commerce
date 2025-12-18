import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const {updatepwd,isLoggedIn} = useApp();
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });

  const text = isLoggedIn ? "Update" : "Forget";

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit =async (e) => {
    e.preventDefault();

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }


    setIsSubmitting(true);
    await updatepwd(passwordData.newPassword).then((res)=>{
        if(res.status=== 200){
            setIsSubmitting(false);
            setIsSuccess(true);
            if(isLoggedIn) navigate("/");
            else navigate("/signin");

        }
    }).catch((err)=>{
        alert(err);
        setIsSubmitting(false);
        setIsSuccess(false);
    })
    
    
   
    // Simulate API call
   /*  setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setPasswordData({
          newPassword: '',
          confirmPassword: ''
        });
        setIsSuccess(false);
        alert('Password updated successfully! Redirecting to profile...');
      }, 2000);
    }, 1500); */
  };

  const handleCancel =()=>{
    setPasswordData({newPassword: '',confirmPassword: ''});
    navigate("/");

  }

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-black hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Profile</span>
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
        <div className="w-full max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{text} Password</h1>
            <p className="text-white text-opacity-90">
              Create a strong password to keep your account secure
            </p>
          </div>

          {/* Password Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {!isSuccess ? (
              <>
                <div className="space-y-6">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {passwordData.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Password Strength</span>
                          <span className={`text-xs font-semibold ${
                            passwordStrength.label === 'Weak' ? 'text-red-500' :
                            passwordStrength.label === 'Medium' ? 'text-yellow-500' :
                            'text-green-500'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {passwordData.confirmPassword && (
                      <div className="mt-2">
                        {passwordData.newPassword === passwordData.confirmPassword ? (
                          <p className="text-xs text-green-600 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Passwords match
                          </p>
                        ) : (
                          <p className="text-xs text-red-600">
                            Passwords do not match
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-semibold mb-3">Password Requirements:</p>
                    <ul className="space-y-2">
                      <li className={`text-sm flex items-center ${
                        passwordData.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                          passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {passwordData.newPassword.length >= 8 && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        At least 8 characters
                      </li>
                      <li className={`text-sm flex items-center ${
                        /\d/.test(passwordData.newPassword) ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                          /\d/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {/\d/.test(passwordData.newPassword) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        Contains numbers (recommended)
                      </li>
                      <li className={`text-sm flex items-center ${
                        /[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                          /[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {/[^a-zA-Z0-9]/.test(passwordData.newPassword) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        Special characters for stronger security
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={isSubmitting}
                      className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                        isSubmitting
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transform'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>{text} Password</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                
                      Cancel
                      
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Success State
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Updated!</h2>
                <p className="text-gray-600">Your password has been changed successfully</p>
              </div>
            )}
          </div>

          {/* Security Tips */}
          <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 border border-black border-opacity-30">
            <h3 className="text-black font-semibold mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Tips
            </h3>
            <ul className="text-black text-sm space-y-2 text-opacity-90">
              <li>• Never share your password with anyone</li>
              <li>• Use a unique password for each account</li>
              <li>• Consider using a password manager</li>
              <li>• Change your password regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;