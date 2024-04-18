import React, { useState, useEffect } from "react";
import CourseFilter from "./CoursesFilter";
import CourseList from "./CoursesList";
import CategoryTitle from "./CategoryTitle";

const CoursesResult = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filtersData, setFiltersData] = useState({
    category: [],
    language: [],
    rating: ["1.0", "2.0", "3.0", "4.0", "5.0"],
    duration: ["0-5", "5-10"],
    level: ["All Level", "Beginner", "Intermediate", "Expert"],
    price: ["Free", "Paid"],
  });
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    rating: "",
    duration: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (courses.length > 0) fetchfiltersData();
  }, [courses]);

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
  const fetchfiltersData = () => {
    setFiltersData({
      ...filtersData,
      category: [...new Set(courses.map((course) => course.category))],
      language: [...new Set(courses.map((course) => course.language))],
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
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
        (course) => course.rating === filters.rating
      );
    }

    if (filters.duration) {
      filteredResults = filteredResults.filter(
        (course) => course.duration === filters.duration
      );
    }

    if (filters.level) {
      filteredResults = filteredResults.filter(
        (course) => course.level === filters.level
      );
    }

    if (filters.price) {
      filteredResults = filteredResults.filter(
        (course) => course.price === filters.price
      );
    }

    if (filters.language) {
      filteredResults = filteredResults.filter(
        (course) => course.language === filters.language
      );
    }

    setFilteredCourses(filteredResults);
  };
  const text = filters.category ? filters.category : <h1>Zakker</h1>;

  return (
    <div>
      <CategoryTitle title={text} description={"lorem"} />

      <p className="total-courses">
        Showing {filteredCourses.length} total results
      </p>

      <CourseFilter filtersData={filtersData} onchange={handleFilterChange} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default CoursesResult;
