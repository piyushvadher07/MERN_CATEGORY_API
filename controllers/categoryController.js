import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = new Category({ name, parent: parent || null });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
