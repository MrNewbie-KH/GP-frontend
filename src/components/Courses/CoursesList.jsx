import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import CourseFilter from "./CoursesFilter";
import CategoryTitle from "./CategoryTitle";

const CoursesList = ({ courses }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // pagination funtion-----------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------
  const coursesPerPage = 8; // courses per page
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = courses.slice(startIndex, endIndex);

  useEffect(() => {
    const totalPagesCount = Math.ceil(courses.length / coursesPerPage);
    setTotalPages(totalPagesCount);
  }, [courses]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };
  //------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="course-list">
        {displayedCourses.map((course) => (
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

export default CoursesList;
