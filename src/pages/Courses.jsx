import React, { useState, useEffect } from "react";
import "./Courses.css";
import Search from "./../components/Search/Search";
import Header from "./../components/Home/Header";
import CourseList from "./../components/Courses/CoursesList";
import CoursesFilter from "../components/Courses/CoursesFilter";
import CategoryTitle from "../components/Courses/CategoryTitle";
import { useParams, useSearchParams } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { title } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchCourses();
  }, []);
  useEffect(() => {
    fetchSearchResult();
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchParams.get("q"));
  });
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSearchResult = () => {
    let result = [...courses];
    result = result.filter(
      (course) =>
        (course &&
          course.title.toLowerCase().includes(searchValue.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(result);
    setSearchResult(result);
  };

  const fitlerCourses = (c) => {
    setFilteredCourses(c);
  };

  return (
    <div>
      <Header />

      <CategoryTitle title={searchValue} description={""} />

      <p className="total-courses">
        Showing {searchResult.length} total results
      </p>

      <CoursesFilter data={searchResult} onfilter={fitlerCourses} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default Courses;
