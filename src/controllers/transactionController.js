// Transaction Controller - Handles transaction-related HTTP requests
// Purpose: Process incoming requests and send responses

import * as transactionService from '../services/transactionService.js';
import { asyncHandler } from '../middleware/validator.js';

// Create transaction
export const createTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  const { type, category, amount, description, date } = req.body;
  
  const transaction = await transactionService.createTransaction(
    userId,
    type,
    category,
    amount,
    description,
    date
  );
  
  res.status(201).json({
    success: true,
    message: 'Transaction created successfully',
    data: transaction
  });
});

// Get all transactions
export const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  
  const transactions = await transactionService.getUserTransactions(userId);
  
  res.status(200).json({
    success: true,
    message: 'Transactions retrieved successfully',
    data: transactions
  });
});

// Get single transaction
export const getTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  const { id } = req.params;
  
  const transaction = await transactionService.getTransaction(id, userId);
  
  res.status(200).json({
    success: true,
    message: 'Transaction retrieved successfully',
    data: transaction
  });
});

// Update transaction
export const updateTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  const { id } = req.params;
  
  const updated = await transactionService.updateTransaction(id, userId, req.body);
  
  res.status(200).json({
    success: true,
    message: 'Transaction updated successfully',
    data: updated
  });
});

// Delete transaction
export const deleteTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  const { id } = req.params;
  
  await transactionService.deleteTransaction(id, userId);
  
  res.status(200).json({
    success: true,
    message: 'Transaction deleted successfully',
    data: null
  });
});

// Get summary
export const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'user1'; // Mock user ID
  
  const summary = await transactionService.getSummary(userId);
  
  res.status(200).json({
    success: true,
    message: 'Summary retrieved successfully',
    data: summary
  });
});
