import React, { useState, useEffect } from "react";
import "./Courses.css";
import Header from "./../components/Home/Header";
import CoursesList from "../components/Courses/CoursesList";
import CoursesFilter from "../components/Courses/CoursesFilter";
import CategoryTitle from "./../components/Courses/CategoryTitle";
import CoursesResult from "../components/Courses/CoursesResult";

const CoursesPage = () => {
  return (
    <div>
      <Header />
      <CoursesResult />
      {/* <CourseFilter /> */}
      {/* <CoursesList /> */}
    </div>
  );
};

export default CoursesPage;
