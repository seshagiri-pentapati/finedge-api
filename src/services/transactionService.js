// Transaction Service - Business logic for transaction operations
// Purpose: Handle CRUD operations, analytics, and transaction management

import * as transactionModel from '../models/transactionModel.js';
import { AppError } from '../middleware/errorHandler.js';

// Create transaction
export const createTransaction = async (userId, type, category, amount, description, date) => {
  const transaction = await transactionModel.createTransaction({
    userId,
    type,
    category,
    amount,
    description: description || '',
    date: date || new Date().toISOString().split('T')[0]
  });
  
  return transaction;
};

// Get all transactions for user
export const getUserTransactions = async (userId) => {
  const transactions = await transactionModel.getTransactionsByUserId(userId);
  return transactions;
};

// Get single transaction
export const getTransaction = async (id, userId) => {
  const transaction = await transactionModel.getTransactionById(id);
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }
  
  // Verify ownership
  if (transaction.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }
  
  return transaction;
};

// Update transaction
export const updateTransaction = async (id, userId, updates) => {
  const transaction = await transactionModel.getTransactionById(id);
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }
  
  if (transaction.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }
  
  const updated = await transactionModel.updateTransaction(id, updates);
  return updated;
};

// Delete transaction
export const deleteTransaction = async (id, userId) => {
  const transaction = await transactionModel.getTransactionById(id);
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }
  
  if (transaction.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }
  
  await transactionModel.deleteTransaction(id);
  return true;
};

// Get summary for user
export const getSummary = async (userId) => {
  const transactions = await transactionModel.getTransactionsByUserId(userId);
  
  let totalIncome = 0;
  let totalExpense = 0;
  const categoryBreakdown = {};
  
  transactions.forEach(t => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
    
    if (!categoryBreakdown[t.category]) {
      categoryBreakdown[t.category] = 0;
    }
    categoryBreakdown[t.category] += t.amount;
  });
  
  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryBreakdown,
    transactionCount: transactions.length
  };
};
