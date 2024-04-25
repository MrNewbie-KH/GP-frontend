import React from "react";
import { useParams, Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const handleRouting = () => {
    console.log(params);
  };
  return (
    <div className="course-card">
      <Link to={`/course/${course.id}`}>
        <img src={course.image} alt={course.title} />
        <div className="course-info">
          <h3>{course.title}</h3>
          <p>{course.instructor}</p>
          <span>{course.rating} ★</span>
          <span>{course.students} students</span>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
