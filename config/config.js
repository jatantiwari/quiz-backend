require("dotenv").config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.DB_URL,
  email: {
    SMTP: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    FROM: process.env.EMAIL_FROM,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_MINUTES: process.env.JWT_EXPIRES_MINUTES,
  JWT_EXPIRES_DAYS: process.env.JWT_EXPIRES_DAYS,
  BASE_URL: process.env.BASE_URL,
  ALLOW_URLS: process.env.ALLOW_URLS,
};