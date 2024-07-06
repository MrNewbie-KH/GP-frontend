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

const CourseCard = ({ course, reload, owncourse, edit }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isTokenChanged, setIsTokenChanged] = useState(false);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const p1 = arr.pop();
  const p2 = arr.pop();
  let activeTab = "";

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
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
        console.log(response.data);
        if (response.data.message === "Course added to cart") {
          toast.success("Course added to cart");
          reload();
        } else {
          toast.error(response.data.message);
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
          toast.info(response.data.message);
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
          !owncourse && (
            <FontAwesomeIcon
              title="Add to Wishlist"
              className="heart"
              icon={faHeart}
              onClick={AddToWish}
            />
          )
        )}
      </div>
      {owncourse && edit ? (
        <Link to={`/dashboard/update/${course.id}`}>
          <div className="image-container-course">
            <img src={course.imageUrl} alt={course.title} />
          </div>
        </Link>
      ) : (
        <Link to={`/course/${course.id}`}>
          <div className="image-container-course">
            <img src={course.imageUrl} alt={course.title} />
          </div>{" "}
        </Link>
      )}
      <div className="course-info">
        {owncourse && edit ? (
          <Link to={`/dashboard/update/${course.id}`}>
            <h3>{course.title}</h3>
          </Link>
        ) : (
          <Link to={`/course/${course.id}`}>
            <h3>{course.title}</h3>
          </Link>
        )}
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
            {!owncourse && (
              <button className="home-btn" onClick={AddToCart}>
                Add to Cart
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
