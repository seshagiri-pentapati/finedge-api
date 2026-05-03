// Transaction Model - Handles transaction data storage and retrieval
// Purpose: CRUD operations for transactions using JSON file persistence

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANSACTIONS_FILE = path.join(__dirname, '../data/transactions.json');

// Initialize transactions.json if it doesn't exist
const initializeFile = async () => {
  try {
    await fs.access(TRANSACTIONS_FILE);
  } catch {
    await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify([], null, 2));
  }
};

// Read all transactions
export const getAllTransactions = async () => {
  await initializeFile();
  const data = await fs.readFile(TRANSACTIONS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Get transactions by user ID
export const getTransactionsByUserId = async (userId) => {
  const transactions = await getAllTransactions();
  return transactions.filter(t => t.userId === userId);
};

// Get single transaction
export const getTransactionById = async (id) => {
  const transactions = await getAllTransactions();
  return transactions.find(t => t.id === id);
};

// Create transaction
export const createTransaction = async (transaction) => {
  const transactions = await getAllTransactions();
  const newTransaction = {
    id: Date.now().toString(),
    ...transaction,
    createdAt: new Date().toISOString()
  };
  transactions.push(newTransaction);
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
  return newTransaction;
};

// Update transaction
export const updateTransaction = async (id, updates) => {
  const transactions = await getAllTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  transactions[index] = { ...transactions[index], ...updates };
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
  return transactions[index];
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const transactions = await getAllTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(filtered, null, 2));
  return true;
};
