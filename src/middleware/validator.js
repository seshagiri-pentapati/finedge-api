// Validator Middleware - Validates incoming request data
// Purpose: Ensure data integrity and prevent invalid operations

import { AppError } from './errorHandler.js';

// Validate transaction input
export const validateTransaction = (req, res, next) => {
  const { type, category, amount, description, date } = req.body;
  
  // Check required fields
  if (!type || !category || !amount) {
    throw new AppError('Missing required fields: type, category, amount', 400);
  }
  
  // Validate type is income or expense
  if (!['income', 'expense'].includes(type)) {
    throw new AppError('Type must be "income" or "expense"', 400);
  }
  
  // Validate amount is positive number
  if (typeof amount !== 'number' || amount <= 0) {
    throw new AppError('Amount must be a positive number', 400);
  }
  
  next();
};

// Validate user input
export const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    throw new AppError('Missing required fields: name, email, password', 400);
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
  
  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }
  
  next();
};

// Wrap async functions to catch errors
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
