import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";

const CoursesList = ({
  courses,
  totalPages,
  currentPage,
  changeCurrentPage,
  reload,
}) => {
  const handlePageChange = async (page) => {
    changeCurrentPage(page);
  };
  return (
    <div>
      {courses !== null && courses !== undefined && courses.length > 0 ? (
        <div>
          {" "}
          <div className="course-list">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} reload={reload} />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <h1>No Courses</h1>
      )}
    </div>
  );
};

export default CoursesList;
