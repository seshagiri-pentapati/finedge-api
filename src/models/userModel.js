// User Model - Handles user data storage and retrieval
// Purpose: CRUD operations for users using JSON file persistence

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.join(__dirname, '../data/users.json');

// Initialize users.json if it doesn't exist
const initializeFile = async () => {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
  }
};

// Read all users
export const getAllUsers = async () => {
  await initializeFile();
  const data = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Find user by email
export const getUserByEmail = async (email) => {
  const users = await getAllUsers();
  return users.find(u => u.email === email);
};

// Find user by ID
export const getUserById = async (id) => {
  const users = await getAllUsers();
  return users.find(u => u.id === id);
};

// Create new user
export const createUser = async (user) => {
  const users = await getAllUsers();
  const newUser = {
    id: Date.now().toString(),
    ...user,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  return newUser;
};

// Update user
export const updateUser = async (id, updates) => {
  const users = await getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  return users[index];
};

// Delete user
export const deleteUser = async (id) => {
  const users = await getAllUsers();
  const filtered = users.filter(u => u.id !== id);
  await fs.writeFile(USERS_FILE, JSON.stringify(filtered, null, 2));
  return true;
};
