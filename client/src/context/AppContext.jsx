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
      const { data } = await axios.get(
        `${backendUrl}/api/user/enrolled-courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setEnrolledCourses(
          Array.isArray(data.enrolledCourse)
            ? data.enrolledCourse.reverse()
            : []
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate average rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    const totalRating = course.courseRatings.reduce(
      (sum, r) => sum + r.rating,
      0
    );
    return totalRating / course.courseRatings.length;
  };

  // Calculate chapter and course durations
  const calculateChapterTime = (chapter) => {
    if (!chapter.chapterContent) return "0m";
    const time = chapter.chapterContent.reduce(
      (sum, lec) => sum + lec.lectureDuration,
      0
    );
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
    return course.courseContent.reduce(
      (total, chapter) => total + (chapter.chapterContent?.length || 0),
      0
    );
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
