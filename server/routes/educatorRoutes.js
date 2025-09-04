// routes/educatorRoutes.js
import express from "express";
// import { requireAuth } from '@clerk/express';
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator,
} from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

// Secure the route with Clerk
educatorRouter.get("/update-role", updateRoleToEducator);

educatorRouter.post(
  "/add-course",
  protectEducator,
  upload.single('image'),
  addCourse
);

educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

export default educatorRouter;







// {
//   "courseTitle":"Test course Title",
//   "courseDescription":"Test course description",
//   "coursePrice":40,
//   "discount":10,
//   "courseContent":[
//     {
//       "chapterId":"Ch01",
//       "chapterOrder":1,
//       "chapterTitle":"Test Chapter Title",
//       "chapterContent":[
//         {
//           "lectureId":"lec01",
//           "lectureTitle":"Test lecture Title",
//           "lectureDuration":20,
//           "lectureUrl":"https://example/com/mp4",
//           "isPreviewFree":true,
//           "lectureOrder":1
//         }
//       ]
//     }
//   ]
// }


















/*

{
"courseTitle":"Test course Title",
"courseDescription":"Test course description",
"coursePrice":40,
"discount":10,
"courseContent":[
{
"chapterId":"Ch01",
"chapterOrder":1,
"chapterTitle":"Test Chapter Title",
"chapterContent":[
{
"lectureId":"lec01",
"lectureTitle":"Test lecture Title",
"lectureDuration":20,
"lectureUrl":"https://example/com/mp4",
"isPreviewFree":true,
"lectureOrder":1
}
]
}
]
}




*/
