import React from "react";
import { useParams, Link, NavLink } from "react-router-dom";

const CourseCard = ({ course }) => {
  const handleRouting = () => {
    console.log(params);
  };
  return (
    <div className="course-card">
      <Link to={`/course/${course.id}`}>
        <img
          src={
            course.image ? course.image : "https://via.placeholder.com/300x150"
          }
          alt={course.title}
        />
        <div className="course-info">
          <h3>{course.title}</h3>
          <div className="instructor-grid">
            {course.instructors.map((ins, index) => (
              <NavLink to={`/user/${ins.id}`} key={index}>
                <div className="instructor-container">
                  <span>{ins.email}</span>
                </div>
              </NavLink>
            ))}
          </div>
          <span>{course.duration}Hours</span>
          <span>
            {course.averageRating} ★({course.numberOfEnrollments})
          </span>
          <span>{course.price} EGP</span>
          <span>{course.level ? course.level : "All Level"}</span>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
