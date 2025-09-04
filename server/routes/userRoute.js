import express from 'express'
import { getUserData, purchaseCourse, userEnrolledCourese } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourese)
userRouter.post('/purchase', purchaseCourse)


export default userRouter;
