import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost:5000/api/users/login'
      : 'http://localhost:5000/api/users/register';

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong!');
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/'); // Navigate to home
      window.location.reload(); // Reload to update Navbar
    } catch (err) {
      console.error('Auth error:', err);
      toast.error('Something went wrong. Check console.');
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
      <ToastContainer theme='dark'/>
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-2xl shadow-cyan-500/30 w-full max-w-md p-8 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          {isLogin ? 'Login to Track Expenses' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {!isLogin && (
            <input
              spellCheck={false}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
          )}

          <input
            spellCheck={false}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            required
          />
          <input
            spellCheck={false}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 rounded-2xl cursor-pointer transition-all duration-300 shadow-md shadow-cyan-500/40 hover:shadow-lg"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 hover:text-cyan-300 underline ml-1 transition"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
