import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import assets from '../assets/assets.js'



const Navbar = ({ setShowConfirm }) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setshowMenu] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Invalid user JSON:', err);
      setUser(null);
    }
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name || 'User'}`
    : null;

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] px-6 py-4 shadow-lg shadow-cyan-500/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-white text-3xl font-bold tracking-wide hover:text-cyan-400 transition-all duration-300"
        >
          Master Tracker
        </Link>

        <ul className="flex space-x-2 md:space-x-6 items-center">
          <li className='hidden md:block'>
            <Link to="/" className="text-white hover:text-cyan-400 font-medium">
              Home
            </Link>
          </li>
          <li className='hidden md:block'>
            <Link to="/expense" className="text-white hover:text-cyan-400 font-medium">
              Expenses
            </Link>
          </li>
          <li className='hidden md:block'>
            <Link to="/about" className="text-white hover:text-cyan-400 font-medium">
              About
            </Link>
          </li>

          <div className='md:hidden relative w-[40px]'>
            <img onClick={()=>{setshowMenu(!showMenu)}} src={assets.menu} className='invert w-10 h-10 ' alt="menu" />

            {showMenu && <div className='absolute backdrop-blur-2xl bg-white/10 top-12 right-6 w-[120px] h-[160px] rounded-xl border-none outline-none flex flex-col gap-2.5 justify-center items-center'>
              <span onClick={() => { navigate('/') }} className='text-white font-semibold text-lg cursor-pointer hover:text-xl'>Home</span>
              <span onClick={() => { navigate('/expense') }} className='text-white font-semibold text-lg cursor-pointer hover:text-xl'>Expense</span>
              <span onClick={() => { navigate('/about') }} className='text-white font-semibold text-lg cursor-pointer hover:text-xl'>About</span>
            </div>
            }

          </div>

          {user ? (
            <>
              <li>
                <Link to="/account">
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-cyan-400 hover:scale-105 transition-transform"
                  />
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { setShowConfirm(true) }}
                  className="text-white hidden md:block hover:text-red-400 font-medium transition duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md shadow-cyan-500/40 hover:shadow-lg hover:shadow-cyan-400/50"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
