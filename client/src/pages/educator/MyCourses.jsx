import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  // const { currency, backendUrl, IsEducator, getToken } = useContext(AppContext);
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);


  
  const [courses, setCourses] = useState(null);


  const fetchEducatorCourses = async () => {
    try {
      const token=await getToken();
      const {data}=await axios.get(backendUrl + '/api/educator/courses', {
      headers:{Authorization: `Bearer ${token}`}
      })

      data.success && setCourses(data.courses)
      
    } catch (error) {
      toast.error(error.message);
      
    }
  };







  useEffect(() => {
     console.log("IsEducator:", isEducator);
    if(isEducator){

      fetchEducatorCourses()
    }

  }, [isEducator]);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 -4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">MY Courses</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All Courses
                </th>
                <th className="px-4 py-3 font-semibold truncate">Earning</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Published on
                </th>
              </tr>
            </thead>
           

            <tbody className="text-xs text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="px-2 py-2 flex items-center space-x-2 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="course Image"
                      className="w-9 h-9 object-cover rounded-sm"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-2 py-2 truncate">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-2 py-2 truncate">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-2 py-2 truncate">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
