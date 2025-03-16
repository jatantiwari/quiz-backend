const { Category } = require("../models");

class CategoryService {
  async addCategory(data) {
    const category = new Category(data);
    await category.save();
    return category;
  }

  async getAllCategories(params) {
    const { name, id } = params;
    return await Category.find({
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(id && { _id: id }),
    });
  }

  async updateCategory(id, data) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) throw new Error("Category not found");
    return category;
  }

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();