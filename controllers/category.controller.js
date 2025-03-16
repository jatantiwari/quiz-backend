const { categoryService } = require("../services");

class CategoryController {
  async createCategory(request, response) {
    try {
      if (!request.body) {
        return response.status(400).json({ message: "Category data required" });
      }
      const category = await categoryService.addCategory(request.body);
      response.status(201).json(category);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async getAllCategories(request, response) {
    try {
      const categories = await categoryService.getAllCategories(request.query);
      response.status(200).json(categories);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  async updateCategory(request, response) {
    try {
      const { id } = request.params;
      if (!id || !request.body) {
        return response.status(400).json({ message: "Category Id required" });
      }
      const updatedCategory = await categoryService.updateCategory(id, request.body);
      response.status(200).json(updatedCategory);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async deleteCategory(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({ message: "Category Id required" });
      }
      await categoryService.deleteCategory(id);
      response.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();