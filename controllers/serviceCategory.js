import categoryModel from '../models/serviceCategoryModel.js'
import asyncHandler from 'express-async-handler'
import serviceModel from '../models/serviceModel.js';

//Create a new category
export const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                message: "Please fill all fields",
                error: true,
                success: false,
            });
        }

        const addCategory = categoryModel({
            name,
            image,
        });
        const savedCategory = await addCategory.save();
        // Check if the category was saved successfully
        if (!savedCategory) {
            return res.status(500).json({
                message: "Failed to create category",
                error: true,
                success: false,
            });
        }

        return res.status(201).json({
            message: "Category created successfully",
            success: true,
            data: savedCategory,
            error: false,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: true,
            success: false,
        });

    }

});

//get categories
export const getCategories = asyncHandler(async (req, res) => {
    try {

        const data = await categoryModel.find().sort({ createdAt: -1 })

        return res.json({
            message: "Categories fetched successfully",
            data: data,
            success: true,
            error: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });

    }
})

// update category
export const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { _id, name, image } = req.body;
        const update = await categoryModel.updateOne(
            { _id: _id },
            { name, image }
        );
        return res.status(200).json({
            message: "Category updated successfully",
            success: true,
            data: update,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
});

//delete category
export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.body;

        const checkProduct = await serviceModel.find({
            category: {
                '$in': [_id]
            }
        }).countDocuments();

        if (checkProduct > 0) {
            return res.status(400).json({
                message: "Category already used cannot be deleted ",
                error: true,
                success: false,
            });
        }

        const deleteCategory = await categoryModel.deleteOne({ _id: _id });
        if (!deleteCategory) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            data: deleteCategory,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
});