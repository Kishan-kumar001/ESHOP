import Category from "../models/category.model.js";
import product from "../models/product.model.js";
import subCategory from "../models/subCategory.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    const addCategory = new Category({
      name,
      image,
    });
    const saveCategory = await addCategory.save();
    if (!saveCategory) {
      return res.status(400).json({
        message: "Failed to add category",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category added successfully",
      error: false,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const GetCategoryController = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({
        message: "No Categories found",
        error: true,
        success: false,
      });
    }
    return res.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;
    const update = await Category.updateOne(
      {
        _id,
      },
      {
        name,
        image,
      }
    );
    return res.json({
      message: "Updated Category",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkSubCategory = await subCategory
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();
    const checkProduct = await product
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();
    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Category contains a product cannot delete it",
        error: true,
        success: false,
      });
    }
    const deleteCategory = await Category.deleteOne({
      _id: _id,
    });
    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
