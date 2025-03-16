const express = require("express");
const { authController } = require("../controllers");

const router = express.Router();

router.post("/register", authController.signupUser);
router.get("/verify-email", authController.verifyAccount);
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.newAccessToken);

module.exports = router;
