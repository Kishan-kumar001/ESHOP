import SubCategory from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    const payload = {
      name,
      image,
      category,
    };
    const createSubCategory = new SubCategory(payload);
    const save = await createSubCategory.save();
    return res.status(201).json({
      message: "Subcategory created successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoryController = async (req, res) => {
  try {
    const data = await SubCategory.find()
      .sort({ createdAt: -1 })
      .populate("category");

    return res.status(200).json({
      message: "subcategory data",
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

export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
    const checkSub = await SubCategory.findById(_id);
    if (!checkSub) {
      return res.status(400).json({
        message: "Sub Category not found",
        error: true,
        success: false,
      });
    }
    const updateSubCategory = await SubCategory.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });
    return res.status(200).json({
      message: "Updated Successfully",
      data: updateSubCategory,
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

export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteSubCategory = await SubCategory.findByIdAndDelete(_id);
    return res.status(200).json({
      message: "Deleted Successfully",
      data: deleteSubCategory,
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
