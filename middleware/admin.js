import userModel from "../models/userModel.js";

const admin = async (req, res, next) => {
    try {
        const userId = req.userId //from middleware
        const user = await userModel.findById(userId)
        if (user.role !== 'admin') {
            return res.status(400).json({
                message: 'permission denied',
                error: true,
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'permission denied',
            error: true,
            success: false
        })
    }
}
export default admin