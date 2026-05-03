// Transaction Routes - Define all transaction-related API endpoints
// Purpose: Map HTTP requests to appropriate controller functions

import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
} from '../controllers/transactionController.js';
import { validateTransaction, asyncHandler } from '../middleware/validator.js';

const router = express.Router();

// POST /transactions - Create new transaction
router.post('/', validateTransaction, createTransaction);

// GET /transactions - Get all transactions
router.get('/', getTransactions);

// GET /transactions/:id - Get single transaction
router.get('/:id', getTransaction);

// PATCH /transactions/:id - Update transaction
router.patch('/:id', updateTransaction);

// DELETE /transactions/:id - Delete transaction
router.delete('/:id', deleteTransaction);

// GET /summary - Get income/expense summary
router.get('/summary/overview', getSummary);

export default router;
