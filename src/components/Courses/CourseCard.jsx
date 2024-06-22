import React from "react";
import { useParams, Link, NavLink, useLocation } from "react-router-dom";
import Button from "./../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCard = ({ course }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const arr = location.pathname.split("/");
  const p1 = arr.pop();
  const p2 = arr.pop();
  let activeTab = "";
  const handle = () => {
    if (p1 === "mycourses" || p2 === "mycourses") {
      activeTab = "mycourses";
    }
    if (p1 === "wishlist" || p2 === "wishlist") {
      activeTab = "wishlist";
    }
    if (p1 === "archived" || p2 === "archived") {
      activeTab = "archived";
    }
  };
  handle();
  const AddToCart = () => {
    axios
      .post(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-cart?courseId=${course.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        if (response.data.message === "Course added to cart") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
        toast.error("Failed to add item to cart!");
      });
  };
  const AddToWish = () => {
    axios
      .post(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-wishlist?courseId=${course.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        if (response.data.message === "Course added to wishlist") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error add course:", error);
      });
  };
  const DeleteToWish = () => {
    axios
      .delete(
        `https://e-learning-platform-uwoj.onrender.com/user/delete-from-wishlist?courseId=${course.id}`,
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
        console.error("Error delete course:", error);
        toast.error(response.data.message);
      });
  };
  const AddToArch = () => {
    axios
      .post(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-archived?courseId=${course.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "OK") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error add course:", error);
      });
  };
  const DeleteFromArch = () => {
    axios
      .delete(
        `https://e-learning-platform-uwoj.onrender.com/user/delete-from-archived?courseId=${course.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "OK") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error delete course:", error);
        toast.error(response.data.message);
      });
  };
  return (
    <div className="course-card">
      <div className="icon-container">
        {activeTab === "mycourses" ? (
          <FontAwesomeIcon
            title="Add to Archive"
            className="archived"
            icon={faBoxArchive}
            onClick={AddToArch}
          />
        ) : activeTab === "wishlist" ? (
          <FontAwesomeIcon
            title="Delete"
            className="delete"
            icon={faTrash}
            onClick={DeleteToWish}
          />
        ) : activeTab === "archived" ? (
          <FontAwesomeIcon
            title="Delete"
            className="delete"
            icon={faTrash}
            onClick={DeleteFromArch}
          />
        ) : (
          <FontAwesomeIcon
            title="Add to Wishlist"
            className="heart"
            icon={faHeart}
            onClick={AddToWish}
          />
        )}
      </div>
      <Link to={`/course/${course.id}`}>
        <div className="image-container-course">
          <img src={course.imageUrl} alt={course.title} />
        </div>
      </Link>
      <div className="course-info">
        <Link to={`/course/${course.id}`}>
          <h3>{course.title}</h3>
        </Link>
        <div className="instructor-grid">
          {course.instructors.map((ins, index) => (
            <NavLink to={`/user/${ins.id}`} key={index}>
              <div className="instructor-container">
                <span>
                  {ins.firstName} {ins.lastName}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
        <span>{"" && $`{course.duration}Hours`}</span>
        <span>
          {course.averageRating} ★({course.numberOfEnrollments})
        </span>
        <span>{course.level ? course.level : "All Level"}</span>
        {activeTab !== "mycourses" && activeTab !== "archived" && (
          <>
            <div className="price">{course.price} EGP</div>
            <button className="home-btn" onClick={AddToCart}>
              Add to Cart
            </button>
          </>
        )}
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default CourseCard;
