import Header from "../components/Home/Header";
import CoursesList from "../components/Courses/CoursesList";
import "./UserPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router";

function UserPage() {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const instructorId = useParams();
  useEffect(() => {
    async function pageData() {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/user/get-user/${instructorId.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setProfile(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    pageData();
  }, []);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="userpage-main">
          <div className="img-title">
            <img src={profile.imageUrl} alt="" />
            <div className="userpage-title">
              <p>Instructor</p>
              <h1>
                {profile.firstName} {profile.lastName}
              </h1>
            </div>
          </div>
          <div className="userpage-info">
            <h1>About</h1>
            <p>{profile.about}</p>
            <h1>Courses</h1>
          </div>
          <div>
            {profile.instructoredCourses && (
              <CoursesList courses={profile.instructoredCourses} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default UserPage;
