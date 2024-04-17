import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import CourseFilter from "./CourseFilter";

const CourseList = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    instructor: "",
    duration: "",
  });
  const coursesPerPage = 8; // Change this value according to your needs

  useEffect(() => {
    const totalPagesCount = Math.ceil(courses.length / coursesPerPage);
    setTotalPages(totalPagesCount);
  }, [courses]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const handleShowResults = async () => {
    try {
      // Perform data fetching here
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = courses.slice(startIndex, endIndex);

  return (
    <div>
      <CourseFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onShowResults={handleShowResults}
      />
      <div className="course-list">
        {showResults &&
          displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CourseList;
