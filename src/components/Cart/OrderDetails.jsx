import React from "react";

const OrderDetails = ({ courses }) => {
  return (
    <div className="order-details">
      <h2>Order details</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <img src={course.imageUrl} alt={course.title} />
            <span>{course.title}</span>
            <span>{course.price.toFixed(2)} EGP</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
