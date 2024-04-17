import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>
        <span>{course.rating} ★</span>
        <span>{course.students} students</span>
      </div>
    </div>
  );
};

export default CourseCard;
