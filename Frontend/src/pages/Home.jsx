import React, { useState } from 'react'
import { FaChartLine, FaPiggyBank, FaWallet } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {

  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate()


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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#141E30] to-[#243B55] text-white font-sans">

      <Navbar setShowConfirm={setShowConfirm} />

      {/* Logout Confirmation Popup */}
      <div
        className={`absolute w-full flex justify-center z-50 transition-all duration-900 ${showConfirm ? 'top-20 opacity-100 translate-y-0' : '-top-10 opacity-0 -translate-y-full'}`}>
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

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide animate-pulse">
          Smart Expense Tracking
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-xl text-gray-300">
          Stay on top of your finances. Manage your spending and start saving smarter with our powerful tracking tool.
        </p>

        {/* Glowing Button */}
        <button
          onClick={() => navigate('/expense')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 cursor-pointer px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-glow"
        >
          🚀 Track Expenses
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-16">
        <div className="bg-white/10 p-6 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition duration-300">
          <FaWallet className="text-4xl mb-3 text-teal-400" />
          <h3 className="text-xl font-semibold mb-1">Budget Planning</h3>
          <p className="text-sm text-gray-300 text-center">
            Visualize your income and set monthly budget limits.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition duration-300">
          <FaChartLine className="text-4xl mb-3 text-pink-400" />
          <h3 className="text-xl font-semibold mb-1">Track Spending</h3>
          <p className="text-sm text-gray-300 text-center">
            Get detailed insights of where your money goes every month.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition duration-300">
          <FaPiggyBank className="text-4xl mb-3 text-yellow-400" />
          <h3 className="text-xl font-semibold mb-1">Save Smarter</h3>
          <p className="text-sm text-gray-300 text-center">
            Build financial discipline and reach your saving goals faster.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 text-center py-4 mt-auto text-gray-400 text-sm">
        © {new Date().getFullYear()} Expense Tracker | Made with ❤️ by Debangshu Samanta
      </footer>
    </div>
  )
}

export default Home
