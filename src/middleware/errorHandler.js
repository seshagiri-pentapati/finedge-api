// Error Handler Middleware - Catches and formats all errors
// Purpose: Ensure consistent error responses across the API

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`❌ Error: ${message}`);
  
  res.status(status).json({
    success: false,
    status,
    message,
    data: null
  });
};

// Custom Error Class for better error management
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
