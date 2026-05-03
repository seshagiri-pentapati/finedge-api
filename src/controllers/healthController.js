// Health Controller - Simple endpoint to verify API is running
// Purpose: Health check for monitoring and deployment verification

export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ FinEdge API is running',
    timestamp: new Date().toISOString()
  });
};
