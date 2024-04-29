import React, { useState, useEffect } from "react";
import CoursesList from "../Courses/CoursesList";
import Loader from "./../Loader";
import axios from "axios";

const Wishlist = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/user/get-wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle successful response

        const list = response.data.data.data;
        setCourses(list); // Update state with fetched data
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, []);
  return <>{isLoading ? <Loader /> : <CoursesList courses={courses} />}</>;
};

export default Wishlist;
