const express = require("express");
const { questionController } = require("../controllers");
const auth = require("../middlewares/auth");
const upload = require("../utils/upload");

const router = express.Router();

router.use(auth);

router.post("/", questionController.createQuestion);
router.get("/", questionController.getQuestions);
router.post("/import", upload.single("file"), questionController.upload)
router.patch("/:id", questionController.update);
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;