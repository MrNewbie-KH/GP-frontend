import React, { useEffect, useState } from "react";
import Header from "./../components/Home/Header";
import CreateCourse from "../components/Dashboard/CreateCourse";
import "./UploadCourse.css";
import axios from "axios";
const UploadCourse = () => {
  const [profile, setProfile] = useState({});
  const token=localStorage.getItem("token");
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

    pageData();
  }, []);
  return (
    <>
      <Header />
      <CreateCourse profile={profile} />
    </>
  );
};
export default UploadCourse;
