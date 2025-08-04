// src/pages/Account.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  let user = null;

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Invalid user data in localStorage:', error);
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="text-white min-h-screen flex justify-center items-center bg-[#0f172a]">
        <div>
          <p>You are not logged in.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-cyan-500 text-white mt-4 px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center relative">
      {/* Logout Confirmation Popup */}
      <div
        className={`absolute w-full flex justify-center z-50 transition-all duration-900 ${showConfirm ? 'top-8 opacity-100 translate-y-0' : '-top-10 opacity-0 -translate-y-full'
          }`}
      >
        <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg border border-white">
          <p className="mb-4">Do you really want to logout from Master Expense Tracker?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 px-4 cursor-pointer rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-green-500 hover:bg-green-400 px-4 cursor-pointer rounded"
            >
              No
            </button>
          </div>
        </div>
      </div>


      <div className="w-[80%] lg:w-[60%] xl:w-[40%] h-[300px] bg-transparent border border-white rounded-xl text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-400 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
