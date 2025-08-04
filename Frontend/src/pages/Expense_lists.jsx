import React, { useEffect, useState } from "react";
import assets from "../assets/assets";

const ExpenseLists = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [range, setRange] = useState("week");
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setid] = useState(null)

  const filterExpenses = () => {
    const now = new Date();
    return allExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (range === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return expenseDate >= oneWeekAgo;
      } else if (range === "month") {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      } else if (range === "year") {
        return expenseDate.getFullYear() === now.getFullYear();
      } else {
        return true;
      }
    });
  };

  const totalAmount = filterExpenses().reduce((sum, exp) => sum + exp.amount, 0);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/expenses/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch expenses");
      }

      const data = await response.json();
      setAllExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error.message);
    }
  };

  const DeleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete failed");
      }

      const result = await response.json();
      console.log(result.message);

      // Refetch expenses after deletion
      fetchExpenses();
    } catch (error) {
      console.error("Failed to delete expense:", error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = filterExpenses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div
        className={`absolute w-full flex justify-center z-50 transition-all duration-900 ${showConfirm ? 'top-5 opacity-100 translate-y-0' : '-top-10 opacity-0 -translate-y-full'}`}>
        <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg border border-white">
          <p className="mb-4">Do you really want to delete the expense?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={()=>{DeleteExpense(id), setShowConfirm(false)}}
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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-10 drop-shadow-md">
          Expense History
        </h1>

        {/* Filter Dropdown */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-gray-800 border border-cyan-500 text-white text-lg px-5 py-3 rounded-full shadow-md shadow-cyan-500/30 transition-all duration-300 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Total Amount */}
        <div className="text-center text-xl font-semibold text-white mb-6">
          Total ({range}): <span className="text-cyan-300">₹{totalAmount}</span>
        </div>

        {/* Expenses List */}
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-400">No expenses found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExpenses.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-gray-800 border relative border-cyan-500/30 rounded-xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-cyan-300 mb-2">{item.title}</h2>
                <p className="text-gray-300 text-md mb-1">
                  Amount: <span className="text-white">₹{item.amount}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Date: {new Date(item.date).toDateString()}
                </p>
                <img
                  onClick={() => {setid(item._id), setShowConfirm(true)}}
                  src={assets.bin}
                  className="w-5 h-5 invert cursor-pointer absolute right-5 bottom-5"
                  alt="delete"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseLists;
