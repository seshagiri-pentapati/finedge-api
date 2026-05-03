// User Service - Business logic for user operations
// Purpose: Handle authentication, registration, and user management

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';
import { AppError } from '../middleware/errorHandler.js';

// Register new user
export const registerUser = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await userModel.createUser({
    name,
    email,
    password: hashedPassword
  });
  
  // Don't return password in response
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Login user
export const loginUser = async (email, password) => {
  // Find user
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }
  
  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401);
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );
  
  const { password: _, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
