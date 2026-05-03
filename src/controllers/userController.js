// User Controller - Handles user-related HTTP requests
// Purpose: Process incoming requests and send responses

import * as userService from '../services/userService.js';
import { asyncHandler } from '../middleware/validator.js';

// Register user
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = await userService.registerUser(name, email, password);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user
  });
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const result = await userService.loginUser(email, password);
  
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
});

// Get user profile
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  
  const user = await userService.getUserById(userId);
  
  res.status(200).json({
    success: true,
    message: 'User profile retrieved',
    data: user
  });
});
