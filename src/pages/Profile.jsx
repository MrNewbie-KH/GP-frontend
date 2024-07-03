import Header from "../components/Home/Header";
import CoursesList from "../components/Courses/CoursesList";
import "./UserPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router";

function Profile() {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({});
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function pageData() {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
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
          console.log(response.data.data);
          setCourses(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    pageData();
    getcourse();
  }, []);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
            <h1>About me</h1>
            <p>
              {" "}
              <b>Who am i ?</b> {profile.about}
            </p>
            <p>
              <b>Phone:</b> {profile.phoneNumber}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            {profile.paypalEmail && (
              <p>
                <b>Paypal:</b> {profile.paypalEmail}
              </p>
            )}
          </div>
          <h1>My Courses</h1>
          <CoursesList courses={courses} owncourse={true} />
        </>
      )}
    </>
  );
}
export default Profile;
