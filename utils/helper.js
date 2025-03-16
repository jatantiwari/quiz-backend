const XLSX = require("xlsx");
const fs = require("fs");
const csvParser = require("csv-parser");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const logger = require("../config/logger")

const readCsvOrExcel = (filePath, header) => {
  return new Promise((resolve, reject) => {
    if (filePath.endsWith(".csv")) {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: header }))
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    } else {
      const workbook = XLSX.readFile(filePath);
      const sheetNameList = workbook.SheetNames;
      const jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNameList[0]],
        {
          header,
          raw: false,
        }
      );
      resolve(jsonData);
    }
  });
};

function deleteFile(filePath) {
  fs.unlink(filePath, function (error) {
    if (error) {
      logger.info(`Error in deleting the file: ${error}.`);
    } else {
      logger.info(`Successfully deleted the file.`);
    }
  });
}

function userDetail(token) {
  const decoded = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
  return decoded.userId;
}

module.exports = {
  readCsvOrExcel,
  deleteFile,
  userDetail
};
