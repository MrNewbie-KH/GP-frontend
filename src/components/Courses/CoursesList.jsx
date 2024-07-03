import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { ToastContainer } from "react-toastify";

const CoursesList = ({
  courses,
  totalPages,
  currentPage,
  changeCurrentPage,
  reload,
  owncourse,
  edit,
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
              <CourseCard
                key={course.id}
                course={course}
                reload={reload}
                owncourse={owncourse}
                edit={edit}
              />
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
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default CoursesList;
