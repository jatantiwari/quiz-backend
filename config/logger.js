const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({level, message }) => {
      return `${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

winston.addColors({
  info: "green",
  warn: "yellow",
  error: "red",
  debug: "magenta",
});

module.exports = logger;