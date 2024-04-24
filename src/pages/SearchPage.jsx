import React, { useState, useEffect } from "react";
import Search from "./../components/Search/Search";
import Header from "./../components/Home/Header";
import CourseList from "./../components/Courses/CoursesList";
import CoursesFilter from "../components/Courses/CoursesFilter";
import CategoryTitle from "../components/Courses/CategoryTitle";

const SearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [searchValue]);

  useEffect(() => {
    fetchSearchResult();
  }, [searchValue]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
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
    setSearchResult(result);
  };

  const showResult = (searchValue) => {
    setSearchValue(searchValue);
  };

  const fitlerCourses = (c) => {
    setFilteredCourses(c);
  };

  return (
    <div>
      <Header onSearched={showResult} />

      <CategoryTitle title={searchValue} description={""} />

      <p className="total-courses">
        Showing {searchResult.length} total results
      </p>

      <CoursesFilter data={searchResult} onfilter={fitlerCourses} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default SearchPage;
