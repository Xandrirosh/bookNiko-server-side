import serviceModel from "../models/serviceModel.js";
import asyncHandler from "express-async-handler";

// Create a new service
export const createService = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            image,
            category,
            price,
            duration,
            description,
        } = req.body;

        if (!name || !image[0] || !category[0] || !price || !description || !duration) {
            return res.status(400).json({
                message: 'Enter required fields',
                error: true,
                success: false
            })
        }
        const newservice = new serviceModel({
            name,
            image,
            category,
            price,
            duration,
            description,
        })
        const savedservice = await newservice.save();
        return res.status(201).json({
            message: 'service created successfully',
            data: savedservice,
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
});

export const getServiceByCategory = asyncHandler(async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                message: 'Category ID is required',
                error: true,
                success: false,
            });
        }

        const service = await serviceModel.find({ category: category }).limit(10).populate('category');

        if (service.length === 0) {
            return res.status(404).json({
                message: 'No service found',
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: 'services retrieved successfully',
            error: false,
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
});

export const getServicesByCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: 'provide category id',
                error: true,
                success: false
            })
        }
        const service = await serviceModel.find({
            category: { $in: id }
        }).limit(15)
        return res.json({
            message: 'category service list',
            error: false,
            success: true,
            data: service
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
})

export const getServiceDetails = asyncHandler(async (req, res) => {
    try {
        const { serviceId } = req.params
        if (!serviceId) {
            return res.status(400).json({
                message: 'provide service id',
                error: true,
                success: false
            })
        }
        const service = await serviceModel.findOne({ _id: serviceId })
        if (!service) {
            return res.status(404).json({
                message: 'service not found',
                error: true,
                success: false
            })
        }
        return res.json({
            message: 'service details',
            error: false,
            success: true,
            data: service
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });

    }
});

export const updateServiceDetails = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: 'provide service _id',
                error: true,
                success: false
            })
        }

        const updateservice = await serviceModel.updateOne({ _id: _id }, {
            ...req.body
        })

        return res.json({
            message: 'updated successfully',
            error: false,
            success: true,
            data: updateservice
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
})

export const deleteServiceDetails = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: 'provide service _id',
                error: true,
                success: false
            })
        }
        const deleteservice = await serviceModel.deleteOne({ _id: _id })
        return res.json({
            message: 'Deleted successfully',
            error: false,
            success: true,
            data: deleteservice
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
})
