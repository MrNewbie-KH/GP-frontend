// Categories.js
import React, { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className="categories">
      <h2>Popular Categories</h2>
      <div className="category-cards">
        {categories.length &&
          categories.map((category) => (
            <div className="category-card" key={category.id}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Categories;
