// Logger Middleware - Logs all incoming requests
// Purpose: Track API activity for debugging and monitoring

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  next();
};

export default logger;
