const mongoose = require("mongoose");
const logger = require("./logger");
const { MONGODB_URI } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    logger.info("Database Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
