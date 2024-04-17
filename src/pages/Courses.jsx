import React, { useState, useEffect } from "react";
import "./Courses.css";
import CourseFilter from "./../components/Courses/CourseFilter";
import CourseList from "./../components/Courses/CourseList";
import Header from "./../components/Home/Header";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    instructor: "",
    duration: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [courses, filters]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const applyFilters = () => {
    let filteredResults = [...courses];

    if (filters.category) {
      filteredResults = filteredResults.filter(
        (course) => course.category === filters.category
      );
    }

    if (filters.rating) {
      filteredResults = filteredResults.filter(
        (course) => course.rating === parseInt(filters.rating)
      );
    }

    if (filters.instructor) {
      filteredResults = filteredResults.filter(
        (course) => course.instructor === filters.instructor
      );
    }

    if (filters.duration) {
      filteredResults = filteredResults.filter(
        (course) => course.duration === filters.duration
      );
    }

    setFilteredCourses(filteredResults);
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <Header />
      <div className="category-div">
        <h2>All Courses</h2>
      </div>
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default CoursesPage;
