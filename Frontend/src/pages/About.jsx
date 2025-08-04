import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white flex flex-col">
      
      <div className="max-w-5xl w-full mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 mb-6 animate-pulse">
          About Master Expense Tracker
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
          Welcome to <span className="text-cyan-400 font-semibold">Master Expense Tracker</span>, your go-to platform for smart expense management.
          Whether you're budgeting monthly, tracking weekly costs, or planning your yearly finances—
          our system is built to give you clarity, control, and peace of mind.
        </p>

        <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-8 shadow-lg shadow-cyan-700/40">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4">
            💡 Why Use This App?
          </h2>
          <ul className="text-left text-gray-300 space-y-3 list-disc list-inside">
            <li><span className="text-cyan-400 font-semibold">Simple UI:</span> Clean and modern design that feels intuitive.</li>
            <li><span className="text-cyan-400 font-semibold">Smart Filters:</span> View your spending by week, month, or year.</li>
            <li><span className="text-cyan-400 font-semibold">Real-Time Sync:</span> Data fetched from backend dynamically.</li>
            <li><span className="text-cyan-400 font-semibold">Free & Secure:</span> 100% free, with secure login and storage.</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4">🚀 Built With</h2>
          <p className="text-gray-300">
            This project uses <span className="text-cyan-400 font-semibold">React</span>, <span className="text-cyan-400 font-semibold">Express</span>, <span className="text-cyan-400 font-semibold">MongoDB</span>,
            and <span className="text-cyan-400 font-semibold">Tailwind CSS</span> to create a powerful full-stack experience.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4">🙋 Who Made This?</h2>
          <p className="text-gray-300">
            This app is proudly developed by <span className="text-cyan-400 font-semibold">Debangshu Samanta</span> as part of a journey to master full-stack development and bring ideas to life.
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-12 cursor-pointer bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-full shadow-lg text-lg font-semibold text-white"
        >
          🔙 Back to Home
        </button>
      </div>

      <footer className="mt-auto text-center text-gray-400 text-sm py-6">
        © {new Date().getFullYear()} Master Expense Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
