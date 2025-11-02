import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import generateAccessToken from '../util/generateAccessToken.js';
import generateRefreshToken from '../util/generateRefreshToken.js';
import uploadImageClodinary from '../util/uploadImageCloudinary.js'

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                message: 'already register email',
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            mobile4
        })

        await newUser.save()

        return res.status(201).json({
            message: 'User registered successfully',
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        })
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Fill the required fields',
                error: true,
                success: false
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                message: 'User not registered',
                error: true,
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
                error: true,
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        if (!accessToken || !refreshToken) {
            return res.status(500).json({
                message: 'Failed to generate tokens',
                error: true,
                success: false
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }
        res.cookie('accessToken', accessToken, cookiesOption)
        res.cookie('refreshToken', refreshToken, cookiesOption)
        return res.status(200).json({
            message: 'logged in successfully',
            error: false,
            success: true,
            data: { accessToken, refreshToken }
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        })
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        const userid = req.userId  // middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        };
        res.clearCookie('accessToken', cookiesOption);
        res.clearCookie('refreshToken', cookiesOption);

        const removeRefreshToken = await userModel.findByIdAndUpdate(
            userid,
            {
                refresh_token: ''
            }
        )

        return res.status(200).json({
            message: 'User logged out successfully',
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        })
    }
})

export const userDetails = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId

        const user = await userModel.findById(userId).select('-password -refresh_token')

        return res.json({
            message: 'User details',
            data: user,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        })
    }
})

export const uploadAvatar = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId //auth middleware
        const image = req.file //multer middleware

        const upload = await uploadImageClodinary(image)

        const updateUSer = await userModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: 'upload profile',
            error: false,
            success: true,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }

});

export const updateUserDetails = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId //auth middleware
        const { name, email, password, mobile } = req.body

        let hashPassword = ''
        if (password) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        }

        const updateUSer = await userModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword }),
        })

        return res.json({
            message: 'Updated successfully',
            error: false,
            success: true,
            data: updateUSer
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }

})