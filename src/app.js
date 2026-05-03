import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import logger from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { healthCheck } from './controllers/healthController.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.get('/health', healthCheck);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler (Must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ FinEdge API running on http://localhost:${PORT}`);
});

export default app;
