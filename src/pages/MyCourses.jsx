import React, { useEffect, useState } from "react";

import Header from "./../components/Home/Header";

import CoursesList from "../components/Courses/CoursesList";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses();
  });
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  return (
    <div className="mycourses">
      <Header />
    </div>
  );
}

export default MyCourses;
