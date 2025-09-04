// import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// // import humanizeDuration from './humanize-Duration'
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from 'axios'
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {

//   // const backendUrl=import.meta.env.VITE_BACKEND_URL
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log('Calling backend URL:', backendUrl + '/api/course/all');

//   const currency = import.meta.env.VITE_CURRENCY;

//   const { getToken } = useAuth();
//   const { user } = useUser();

//   //when i click write upper logo it will open navbar page
//   const navigate = useNavigate();

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setEducator] = useState(true);
//   const [enrolledCourses, setEnroledCourses] = useState([]);

//   //feth all courses
//   const fetchAllCourses = async () => {
//     try {
//   const {data}= await axios.get(backendUrl+'/api/course/all')

//   if(data.success){

//     setAllCourses(data.course)
//   } else{
//     toast.error(data.message)

//   }

// } catch (error) {
//       toast.error(error.message);

//     }
//   };

//   //function to calculate average rating of course
//   const calculateRating = (course) => {
//     if (course.courseRatings.length == 0) {
//       return 0;
//     }
//     let totalRating = 0;
//     course.courseRatings.forEach((rating) => {
//       totalRating += rating.rating;
//     });
//     return totalRating / course.courseRatings.length;
//   };

//   //funtion to calculate course chapter time

//   const calculateChapterTime = (chapter) => {
//     let time = 0;
//     chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   //function to calculate course duration
//   const calculateCourseDuration = () => {
//     let time = 0;

//     course.courseContent.map((chapter) =>
//       chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
//     );
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   //function calculate to NO of lectures in the course
//   const calculateNoOfLectures = (course) => {
//     let totalLectures = 0;
//     course.courseContent.forEach((chapter) => {
//       if (Array.isArray(chapter.chapterContent)) {
//         totalLectures += chapter.chapterContent.length;
//       }
//     });
//     return totalLectures;
//   };

//   //fetch user enrolled courses
//   const fetchUserEnrolledCourses = async () => {
//     setEnroledCourses(dummyCourses);
//   };

//   useEffect(() => {
//     fetchAllCourses();
//     fetchUserEnrolledCourses();
//   }, []);

//   const logToken = async () => {
//     console.log(await getToken());
//   }

//   useEffect(() => {
//     if (user) {
//       logToken();
//     }
//   }, [user]);

//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     calculateRating,
//     isEducator,
//     calculateChapterTime,
//     calculateNoOfLectures,
//     calculateCourseDuration,
//     enrolledCourses,
//     fetchUserEnrolledCourses,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };







// import { createContext, useEffect, useState } from "react";
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // Create context
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   // Remove trailing slash from backend URL
//   const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");
//   const currency = import.meta.env.VITE_CURRENCY;

//   const { getToken } = useAuth();
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [userData, setUserData] = useState(null);

//   // Fetch all courses
//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/course/all`);
//       if (data.success) {
//         // Adjust according to backend key (course or courses)
//         setAllCourses(data.courses || data.course || []);
//         console.log("Courses fetched:", data.courses || data.course);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   //fetch UserData

//   const fetchUserData = async () => {
//     if (user.publicMetadata.role === "educator") {
//       setIsEducator(true);
//     }

//     try {
//       const token = await getToken();
//       const { data } = await axios.get(backendUrl + "/api/user/data", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch user enrolled courses (dummy for now)
//   const fetchUserEnrolledCourses = async () => {

//     try {
//         const token=await getToken();
//     const {data}=await axios.get(backendUrl + '/api/user/enrolled-courses',
//       {headers: {Authorization: `Bearer ${token}`}}
//     )

//     if(data.success){
//       setEnrolledCourses(data.enrolledCourses.reverse())
//     } else{
//       toast.error(data.message)
//     }
      
//     } catch (error) {
//       toast.error(error.message)
      
//     }
  
//   };

//   // Calculate average rating
//   const calculateRating = (course) => {
//     if (!course.courseRatings || course.courseRatings.length === 0) return 0;
//     const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
//     return Math.floor(totalRating/ course.courseRatings.length)
//   };

//   // Calculate total chapter time
//   const calculateChapterTime = (chapter) => {
//     if (!chapter.chapterContent) return "0m";
//     let time = chapter.chapterContent.reduce(
//       (sum, lec) => sum + lec.lectureDuration,
//       0
//     );
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // Calculate total course duration
//   const calculateCourseDuration = (course) => {
//     if (!course.courseContent) return "0m";
//     let time = 0;
//     course.courseContent.forEach((chapter) => {
//       chapter.chapterContent?.forEach((lec) => (time += lec.lectureDuration));
//     });
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // Calculate number of lectures
//   const calculateNoOfLectures = (course) => {
//     if (!course.courseContent) return 0;
//     let total = 0;
//     course.courseContent.forEach((chapter) => {
//       if (Array.isArray(chapter.chapterContent)) {
//         total += chapter.chapterContent.length;
//       }
//     });
//     return total;
//   };

//   // // Log token (optional)
//   // const logToken = async () => {
//   //   console.log(await getToken());
//   // };

//   // Effects
//   useEffect(() => {
//     fetchAllCourses();
    
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//   }, [user]);

//   // Context value
//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     calculateRating,
//     isEducator,
//     calculateChapterTime,
//     calculateNoOfLectures,
//     calculateCourseDuration,
//     enrolledCourses,
//     fetchUserEnrolledCourses,
//     backendUrl,
//     userData,
//     setUserData,
//     getToken,
//     fetchAllCourses,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };








// import { createContext, useEffect, useState } from "react";
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // Create context
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   // Remove trailing slash from backend URL
//   const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");
//   const currency = import.meta.env.VITE_CURRENCY;

//   const { getToken } = useAuth();
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [userData, setUserData] = useState(null);

//   // Fetch all courses
//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/course/all`);
//       if (data.success) {
//         setAllCourses(data.courses || data.course || []);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch user data
//   const fetchUserData = async () => {
//     if (user?.publicMetadata?.role === "educator") {
//       setIsEducator(true);
//     }

//     try {
//       const token = await getToken();
//       const { data } = await axios.get(`${backendUrl}/api/user/data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch user enrolled courses
//   const fetchUserEnrolledCourses = async () => {
//     try {
//       const token = await getToken();
//       // console.log(token);
//       const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(data)

//       if (data.success) {
//         setEnrolledCourses(Array.isArray(data.enrolledCourse) ? data.enrolledCourse.reverse() : []);
//       } else {
//         toast.error(data.message);
//       }

// //       if (data.success) {
// //   setEnrolledCourses(
// //     Array.isArray(data.enrolledCourse) ? data.enrolledCourse.reverse() : []
// //   );
// // } else {
// //   toast.error(data.message);
// // }




//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Calculate average rating
//   const calculateRating = (course) => {
//     if (!course.courseRatings || course.courseRatings.length === 0) return 0;
//     const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
//     return totalRating / course.courseRatings.length;
//   };

//   // Calculate total chapter time
//   const calculateChapterTime = (chapter) => {
//     if (!chapter.chapterContent) return "0m";
//     const time = chapter.chapterContent.reduce((sum, lec) => sum + lec.lectureDuration, 0);
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // Calculate total course duration
//   const calculateCourseDuration = (course) => {
//     if (!course.courseContent) return "0m";
//     let time = 0;
//     course.courseContent.forEach((chapter) => {
//       chapter.chapterContent?.forEach((lec) => (time += lec.lectureDuration));
//     });
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // Calculate number of lectures
//   const calculateNoOfLectures = (course) => {
//     if (!course.courseContent) return 0;
//     let total = 0;
//     course.courseContent.forEach((chapter) => {
//       if (Array.isArray(chapter.chapterContent)) {
//         total += chapter.chapterContent.length;
//       }
//     });
//     return total;
//   };

//   // Effects
//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//   }, [user]);

//   // Context value
//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     calculateRating,
//     isEducator,
//     calculateChapterTime,
//     calculateNoOfLectures,
//     calculateCourseDuration,
//     enrolledCourses,
//     fetchUserEnrolledCourses,
//     backendUrl,
//     userData,
//     setUserData,
//     getToken,
//     fetchAllCourses,
//     setIsEducator,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };













import { createContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");
  const currency = import.meta.env.VITE_CURRENCY;

  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) setAllCourses(data.courses || data.course || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user data & determine educator role
  const fetchUserData = async () => {
    try {
      if (!user) return;

      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setIsEducator(user?.publicMetadata?.role === "educator");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      if (!user) return;

      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setEnrolledCourses(Array.isArray(data.enrolledCourse) ? data.enrolledCourse.reverse() : []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate average rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return totalRating / course.courseRatings.length;
  };

  // Calculate chapter and course durations
  const calculateChapterTime = (chapter) => {
    if (!chapter.chapterContent) return "0m";
    const time = chapter.chapterContent.reduce((sum, lec) => sum + lec.lectureDuration, 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    if (!course.courseContent) return "0m";
    let time = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent?.forEach((lec) => (time += lec.lectureDuration));
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course) => {
    if (!course.courseContent) return 0;
    return course.courseContent.reduce((total, chapter) => total + (chapter.chapterContent?.length || 0), 0);
  };

  // Effects
  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchUserData();
      fetchUserEnrolledCourses();
      setLoading(false);
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseDuration,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    userData,
    setUserData,
    getToken,
    fetchAllCourses,
    setIsEducator,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
