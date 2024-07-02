import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartCourseCard = (course) => {
  const token = localStorage.getItem("token");
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
        toast.success("Removed");
      })
      .catch((error) => {
        // Handle error
        toast.error("error");
        console.error("Error delete course:", error);
      });
  };
  return (
    <div className="small-cart-item-card" key={course.course.id}>
      <img
        className="small-cart-item-img"
        src={course.course.imageUrl}
        alt={course.course.title}
      />
      <FontAwesomeIcon
        className="small-cart-delete"
        icon={faTrash}
        onClick={DeletefromCart}
      />
      <div className="small-cart-item-details">
        <h3 className="small-cart-item-title">{course.course.title}</h3>

        <p className="small-cart-item-price">{course.course.price} E£</p>
      </div>
    </div>
  );
};
export default CartCourseCard;
