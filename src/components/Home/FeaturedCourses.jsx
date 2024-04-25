import React, { useState, useEffect } from "react";
import CourseCard from "../Courses/CourseCard";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8; // Change this value according to your needs

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    setDisplayedCourses(courses.slice(startIndex, endIndex));
  }, [currentPage, courses]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching featured courses:", error);
    }
  };

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    if (courses.length < endIndex) {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const data = await response.json();
        setCourses([...courses, ...data.slice(courses.length, endIndex)]);
      } catch (error) {
        console.error("Error fetching more courses:", error);
      }
    }
  };

  return (
    <section className="featured-courses">
      <h2>Featured Courses</h2>
      <div className="course-cards">
        {displayedCourses.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
