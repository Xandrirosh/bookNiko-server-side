import { Router } from "express";
import auth from '../middleware/auth.js'
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/serviceCategory.js";

const categoryRouter = Router()

// Define routes for category operations
categoryRouter.post('/add-category', auth, createCategory);
categoryRouter.get('/get-category', getCategories);
categoryRouter.put('/update-category', auth, updateCategory);
categoryRouter.delete('/delete-category', auth, deleteCategory);

export default categoryRouter