import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets.js';
import { ToastContainer , toast } from 'react-toastify';

const Expense = () => {
  const navigate = useNavigate();

  let user = null;
  let userId = null;

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
      userId = user?._id;
    }
  } catch (error) {
    console.error('Invalid user data in localStorage:', error);
  }

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.warning("Please log in to add an expense.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: form.title,
          amount: form.amount,
          category: form.category,
          date: form.date
        })
      });


      const data = await response.json();
      toast.success('Expense Added Successfully.')
      console.log('Added Expense:', data);

      // Reset form
      setForm({ title: '', amount: '', category: '', date: '' });

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex-col gap-5 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 flex items-center justify-center">
      <ToastContainer theme='dark' />
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl shadow-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-white block mb-2 font-medium">Title</label>

            <input
              spellCheck={false}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="E.g. Grocery Shopping"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-white block mb-2 font-medium">Amount</label>
            <input
              spellCheck={false}
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-white block mb-2 font-medium">Category</label>
            <input
            spellCheck={false}
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="E.g. Food, Travel"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-white block mb-2 font-medium">Date</label>
            <input
            spellCheck={false}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-white font-semibold py-2 rounded-lg shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-cyan-400/60"
          >
            Add Expense
          </button>
        </form>
      </div>

      <button
        onClick={() => { navigate('/expenselists') }}
        className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-3xl text-white font-semibold shadow-lg shadow-cyan-500/30 
             hover:bg-cyan-400 hover:shadow-cyan-500/50  flex gap-3 items-center cursor-pointer"
      >
        Show All Expenses
        <img src={assets.arrow} className='w-10 h-10 invert' alt="arrow" />
      </button>
    </div>
  );
};

export default Expense;
