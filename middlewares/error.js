const config = require("../config/config");
const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Error: ", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
