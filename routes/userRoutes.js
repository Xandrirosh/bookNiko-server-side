import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUserDetails, uploadAvatar, userDetails } from "../controllers/userController.js";
import auth from '../middleware/auth.js'
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', auth, logoutUser);
userRouter.get('/me', auth, userDetails)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
userRouter.put('/update-user', auth, updateUserDetails)

export default userRouter;
