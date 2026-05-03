// User Routes - Define all user-related API endpoints
// Purpose: Map HTTP requests to appropriate controller functions

import express from 'express';
import { register, login, getProfile } from '../controllers/userController.js';
import { validateUser, asyncHandler } from '../middleware/validator.js';

const router = express.Router();

// POST /users/register - Create new user
router.post('/register', validateUser, register);

// POST /users/login - User login
router.post('/login', asyncHandler((req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Email and password required');
  }
  next();
}), login);

// GET /users/profile - Get logged in user profile
router.get('/profile', getProfile);

export default router;
