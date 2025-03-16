const express = require('express');
const authRoute = require("./auth.route")
const userRoute = require("./user.route")
const categoryRoute = require("./category.route")
const questionRoute = require("./question.route")
const userAnswerRoute = require("./userAnswer.route")

const router = express.Router();

router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/category", categoryRoute)
router.use("/question", questionRoute)
router.use("/answer", userAnswerRoute)

module.exports = router;