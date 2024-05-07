import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import axios from "axios";
import Loader from "../components/Loader";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/user/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const list = response.data.data;
        setItems(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const DeletefromCart = (id) => {
    axios
      .delete(
        `https://e-learning-platform-uwoj.onrender.com/user/delete-from-cart?courseId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error delete course:", error);
        toast.error(response.data.message);
      });
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, course) => total + course.price, 0);
  };

  return (
    <>
      <Header />
      <div className="cart-wrapper">
        <div>
          <h1 className="cart-title">Shopping Cart</h1>

          {isLoading ? (
            <Loader />
          ) : items !== undefined && items.length > 0 ? (
            <div className="cart-items-grid">
              {items.map((course) => (
                <div className="cart-item-card" key={course.id}>
                  <img
                    className="cart-item-img"
                    src={course.imageUrl}
                    alt={course.title}
                  />
                  <FontAwesomeIcon
                    className="cart-delete"
                    icon={faTrash}
                    onClick={DeletefromCart}
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{course.title}</h3>
                    <p className="cart-item-instructor">
                      By:{" "}
                      {course.instructors.map((ins, index) => (
                        <NavLink to={`/user/${ins.id}`} key={index}>
                          {ins.firstName} {ins.lastName}
                          <span>, </span>
                        </NavLink>
                      ))}
                    </p>
                    <p className="cart-item-duration">
                      Duration: {course.duration} Hours
                    </p>
                    <p className="cart-item-price">{course.price} E£</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>No Courses</h1>
          )}
        </div>
        <div className="cart-total">
          <h3 className="cart-total-title">Total:</h3>
          <h2>{calculateTotalPrice()} E£</h2>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
