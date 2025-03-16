const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const directory = path.join(__dirname, "../uploads/temp");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, directory);
  },
  filename(_req, file, callback) {
    const fileExt = file.mimetype.split("/")[1] || "csv";
    callback(null, `${crypto.randomUUID()}.${fileExt}`);
  },
});

const allowedFileTypes = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const fileFilter = (req, file, callback) => {
  const endpoint = req.url.split("/").pop();

  if (endpoint === "import" || endpoint === "bulkimport") {
    if (allowedFileTypes.includes(file.mimetype)) {
      return callback(null, true);
    } else {
      return callback(new Error("Invalid file type. Only CSV and Excel files are allowed."), false);
    }
  } else {
    return callback(new Error("Invalid endpoint for file upload."), false);
  }
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;