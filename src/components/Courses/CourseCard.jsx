import React from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import Button from "./../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const CourseCard = ({ course }) => {
  const token = localStorage.getItem("token");
  const handleRouting = () => {
    console.log(params);
  };
  const AddToWish = () => {
    axios
      .get(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-wishlist/${course.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  };
  return (
    <div className="course-card">
      <Link to={`/course/${course.id}`}>
        <div className="image-container-course">
          <img
            src={
              course.image
                ? course.image
                : "https://via.placeholder.com/300x150"
            }
            alt={course.title}
          />
          <NavLink>
            <div className="heart-icon-container" onClick={AddToWish}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </NavLink>
        </div>
        <div className="course-info">
          <h3>{course.title}</h3>
          <div className="instructor-grid">
            {course.instructors.map((ins, index) => (
              <NavLink to="/cart" key={index}>
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
          <span>{course.level ? course.level : "All Level"}</span>
          <NavLink>
            <div className="price" onClick={AddToWish}>
              {course.price} EGP
              <Button>Add to Cart</Button>
            </div>
          </NavLink>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
