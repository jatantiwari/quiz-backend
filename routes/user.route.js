const express = require("express");
const { userController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/profile/:userId", userController.getProfile);
router.patch("/profile/:userId", userController.update)

module.exports = router;