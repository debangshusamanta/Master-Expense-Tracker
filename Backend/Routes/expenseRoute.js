import express from 'express';
import {
  addExpense,
  getExpenses,
  deleteExpense
} from '../Controller/expenseController.js';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

// Apply requireLogin middleware to protect routes
router.post('/', requireLogin, addExpense);
router.get('/data', requireLogin, getExpenses);
router.delete('/:id', requireLogin, deleteExpense);

export default router;
