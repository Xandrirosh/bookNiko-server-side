import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import uploadImageController from "../controllers/uploadImageController.js";

const uploadRouter = Router()
uploadRouter.post('/upload-image', auth, upload.single('image'), uploadImageController)

export default uploadRouter