const express = require("express");
const { userAnswerController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.post("/", userAnswerController.addAnswer);
router.get("/", userAnswerController.getAnswer);

module.exports = router;