import express from 'express'
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourese } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourese)
userRouter.post('/purchase', purchaseCourse)

userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRating)


export default userRouter;
