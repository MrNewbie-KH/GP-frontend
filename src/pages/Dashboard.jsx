import Header from "../components/Home/Header";
import CoursesList from "../components/Courses/CoursesList";
import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getcourse() {
      try {
        const response = await axios.post(
          `https://e-learning-platform-uwoj.onrender.com/user/get-instructor-courses`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === "OK") {
          setCourses(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getcourse();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>My Courses</h1>
          <div className="add-course">
            <Link to="/dashboard/update">
              <button className="add-course-btn">Add Course</button>
            </Link>
          </div>
          <h1></h1>
          <CoursesList courses={courses} owncourse={true} edit={true} />
        </>
      )}
    </>
  );
}
export default Dashboard;
