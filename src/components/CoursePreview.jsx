import React, { PureComponent } from "react";
import "../pages/Cart.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursePreview = (course) => {
  const token = localStorage.getItem("token");
  console.log(course);
  const DeletefromCart = () => {
    axios
      .delete(
        `https://e-learning-platform-uwoj.onrender.com/user/delete-from-cart?courseId=${course.course.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        toast.success("Removed");
      })
      .catch((error) => {
        // Handle error
        toast.error("error");
        console.error("Error delete course:", error);
      });
  };
  return (
    <div className="cart-item-card" key={course.course.id}>
      <img
        className="cart-item-img"
        src={course.course.imageUrl}
        alt={course.course.title}
      />
      <FontAwesomeIcon
        className="cart-delete"
        icon={faTrash}
        onClick={DeletefromCart}
      />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{course.course.title}</h3>
        <p className="cart-item-instructor">
          By:{" "}
          {course.course.instructors &&
            course.course.instructors.map((ins, index) => (
              <NavLink to={`/user/${ins.id}`} key={index}>
                {ins.firstName} {ins.lastName}
                <span>, </span>
              </NavLink>
            ))}
        </p>
        <p className="cart-item-duration">
          Duration: {course.course.duration} Hours
        </p>
        <p className="cart-item-price">{course.course.price} E£</p>
      </div>
    </div>
  );
};
export default CoursePreview;
