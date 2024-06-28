import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import axios from "axios";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import CoursePreview from "../components/CoursePreview";
import { NavLink } from "react-router-dom";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(list);
        setItems(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [items]);

  let calculateTotalPrice = () => {
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
                <CoursePreview course={course} key={course.id} />
              ))}
            </div>
          ) : (
            <h1>No Courses</h1>
          )}
        </div>
        <div className="cart-total">
          <h3 className="cart-total-title">Total:</h3>
          <h2>{calculateTotalPrice()} E£</h2>
          <NavLink to="/payment">
            <button className="checkout-btn">Checkout</button>
          </NavLink>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

export default Cart;
