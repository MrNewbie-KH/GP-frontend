// FeaturedCourses.js
import React, { useState, useEffect } from "react";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) =>
        console.error("Error fetching featured courses:", error)
      );
  }, []);

  return (
    <section className="featured-courses">
      <h2>Featured Courses</h2>
      <div className="course-cards">
        {courses.length &&
          courses.map((course) => (
            <div className="course-card" key={course.id}>
              <img src={course.image} alt={course.title} />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
                <span>{course.rating} ★</span>
                <span>{course.students} students</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
