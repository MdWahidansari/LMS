


// routes/educatorRoutes.js
import express from 'express';
// import { requireAuth } from '@clerk/express';
import {addCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// Secure the route with Clerk
educatorRouter.get('/update-role', updateRoleToEducator);

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)

export default educatorRouter;



