import React, { useState, useEffect } from "react";
import CoursesList from "../Courses/CoursesList";
import Loader from "./../Loader";
import axios from "axios";

const Archived = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  let token = localStorage.getItem("token");
  const re = () => {
    setReload((reload) => !reload);
  };
  useEffect(() => {
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/user/get-archived", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle successful response

        const list = response.data.data;
        setCourses(list); // Update state with fetched data
        setIsLoading(false);
        setReload(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, [reload, token]);
  return (
    <>
      {isLoading ? <Loader /> : <CoursesList courses={courses} reload={re} />}
    </>
  );
};

export default Archived;
