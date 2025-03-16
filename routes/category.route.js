const express = require("express");
const { categoryController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;