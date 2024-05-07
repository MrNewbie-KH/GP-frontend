import React from "react";

const CategoryTitle = ({ title, description }) => {
  return (
    <div className="category-div">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CategoryTitle;
