const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    error = new ErrorResponse(messages, 400);
  }

  else if (err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => e.message);
    error = new ErrorResponse(messages, 400);
  }

  else if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = new ErrorResponse('Foreign key constraint failed', 400);
  }

  else if (err.name === 'SequelizeDatabaseError') {
    error = new ErrorResponse('Database error occurred', 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;

