import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const userId = req.user.id; // get user from token via middleware

    const expense = new Expense({
      title,
      amount: Number(amount),
      category,
      user: userId,
      date: new Date(date)
    });

    await expense.save();

    res.status(201).json({ message: 'New Expense Added Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error Occurred', error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error Occurred', error: error.message });
  }
};



export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense Not Found.' });
    }

    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: 'Expense Deleted Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error Occurred', error: error.message });
  }
};
