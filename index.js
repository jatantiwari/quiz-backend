require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./config/logger");
const config = require("./config/config");
const routes = require("./routes")
const cors = require("cors")
const errorHandler = require("./middlewares/error");

connectDB();

const app = express();
app.use(express.json());

const allowlist = new Set(config.ALLOW_URLS.split(","));
const corsOptionsDelegate = function (request, callback) {
  let corsOptions;
  if (allowlist.has(request.header("Origin"))) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(undefined, corsOptions);
}; 

app.use(cors(corsOptionsDelegate));

app.use(errorHandler);

app.use("/api", routes);

const PORT = config.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));