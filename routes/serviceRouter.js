import { Router } from "express";
import auth from "../middleware/auth.js";
import admin from '../middleware/admin.js'
import { createService, deleteServiceDetails, getServiceByCategory, getServiceDetails, getServicesByCategory, updateServiceDetails } from "../controllers/ServiceController.js";

const serviceRouter = Router()

serviceRouter.post('/create',auth ,createService)
serviceRouter.get('/get-service-by-category', getServiceByCategory);
serviceRouter.post('/get-services-by-category', getServicesByCategory)
serviceRouter.get('/get-service-details/:serviceId', getServiceDetails);
serviceRouter.put('/update-service-details', auth, admin, updateServiceDetails)
serviceRouter.delete('/delete-service',auth, admin, deleteServiceDetails)

export default serviceRouter