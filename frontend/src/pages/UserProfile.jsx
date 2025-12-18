import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Lock, Eye, EyeOff, Camera, ArrowLeft } from 'lucide-react';
import UpdatePassword from './UpdatePassword.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

  const {user,sendOtp} = useApp();
  const navigate = useNavigate();

  

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: "",
    
  });

  const handleUpdate = async()=>{
   await sendOtp(user.email).then((result) => {
    if(result.status===200){
      navigate("/verify");
    }
   }).catch((err) => {
    console.log(err)
   });;
  }

useEffect(() => {
  if (user && user._id) {
    const date = new Date(user.createdAt);
    setUserData({
      name: user.name,
      email: user.email,
      phone: `+91 ${user.phone}`,
      joinDate: `${date.toString().split(" ")[1]} ${date.toString().split(" ")[2]}, ${date.toString().split(" ")[3]}`
    });
  }
}, [user]);


if (!userData) {
  return <p className="text-center mt-10">Loading profile...</p>;
}


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">ShopHub</span>
            </div>
          </div>
        </div>
      </header>
    
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-linear-to-r from-blue-500 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-linear-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-xl">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600 mt-1">{userData.email}</p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                  <>
                    
                    <button
                      onClick={handleUpdate}
                      className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  </>
                
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Full Name
              </label>
                <p className="text-gray-800 text-lg px-4 py-3 bg-gray-50 rounded-lg">{userData.name}</p>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Email Address
              </label>
              <p className="text-gray-800 text-lg px-4 py-3 bg-gray-50 rounded-lg">{userData.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                Phone Number
              </label>
              <p className="text-gray-800 text-lg px-4 py-3 bg-gray-50 rounded-lg">{userData.phone}</p>             
            </div>


            {/* Join Date */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Member Since
              </label>
              <p className="text-gray-800 text-lg px-4 py-3 bg-gray-50 rounded-lg">{userData.joinDate}</p>
            </div>

          
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserProfile;