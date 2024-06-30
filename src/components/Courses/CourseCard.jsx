import React, { useEffect, useState } from "react";
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

const CourseCard = ({ course, reload }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isTokenChanged, setIsTokenChanged] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      console.log("newToken", newToken);
      console.log("token", token);
      if (newToken !== token) {
        setToken(newToken);
        setIsTokenChanged(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

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
    if (token === null || isTokenChanged) return toast.error("Login First");
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
        if (response.data.message === "Course added to cart") {
          toast.success("Course added to cart");
          reload();
        } else {
          toast.error("already in cart");
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        toast.error("Failed to add item to cart!");
      });
  };

  const AddToWish = () => {
    if (token === null || isTokenChanged) return toast.error("Login First");

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
        if (response.data.message === "Course added to wishlist") {
          toast.success("Course added to wishlist");
        } else {
          toast.error("already in wishlist");
        }
      })
      .catch((error) => {
        console.error("Error add course:", error);
      });
  };

  const DeleteToWish = () => {
    if (token === null || isTokenChanged) return toast.error("Login First");

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
        console.log(response.data);
        toast.success("Removed");
        reload();
      })
      .catch((error) => {
        console.error("Error delete course:", error);
        toast.error(response.data.message);
      });
  };

  const AddToArch = () => {
    if (token === null || isTokenChanged) return toast.error("Login First");

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
          toast.success("Course added to archived");
        } else {
          toast.error("already in archived");
        }
      })
      .catch((error) => {
        console.error("Error add course:", error);
      });
  };

  const DeleteFromArch = () => {
    if (token === null || isTokenChanged) return toast.error("Login First");

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
          toast.success("Removed");
          reload();
        } else {
          toast.error("not in archived");
        }
      })
      .catch((error) => {
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
      </div>
    </div>
  );
};

export default CourseCard;
