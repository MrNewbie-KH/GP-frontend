import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursePreview = ({ course, reload }) => {
  const token = localStorage.getItem("token");

  const DeletefromCart = () => {
    axios
      .delete(
        `https://e-learning-platform-uwoj.onrender.com/user/delete-from-cart?courseId=${course.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Removed");
        reload(); // Call the reload function passed as a prop
      })
      .catch((error) => {
        toast.error("Error");
        console.error("Error deleting course:", error);
      });
  };

  return (
    <div className="cart-item-card" key={course.id}>
      <img className="cart-item-img" src={course.imageUrl} alt={course.title} />
      <FontAwesomeIcon
        className="cart-delete"
        icon={faTrash}
        onClick={DeletefromCart}
      />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{course.title}</h3>
        <p className="cart-item-instructor">
          By:{" "}
          {course.instructors &&
            course.instructors.map((ins, index) => (
              <NavLink to={`/user/${ins.id}`} key={index}>
                {ins.firstName} {ins.lastName}
                <span>, </span>
              </NavLink>
            ))}
        </p>
        <p className="cart-item-duration">Duration: {course.duration} Hours</p>
        <p className="cart-item-price">{course.price} E£</p>
      </div>
    </div>
  );
};

export default CoursePreview;
