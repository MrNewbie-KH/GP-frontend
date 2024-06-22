import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CategoriesPanel = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/category/all")
      .then((response) => {
        // Handle successful response
        const list = response.data.data;
        setCategories(list); // Update state with fetched data
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, []);

  const showNextCategory = () => {
    if (currentIndex < categories.length - 5) {
      setCurrentIndex((prevIndex) => prevIndex + 5);
    }
  };

  const showPreviousCategory = () => {
    if (currentIndex >= 5) {
      setCurrentIndex((prevIndex) => prevIndex - 5);
    } else if (currentIndex > 0) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="categories-Section">
      <h2>Popular Categories</h2>
      <div className="categoriesPanel">
        <button className="arrowButton" onClick={showPreviousCategory}>
          {" "}
          &lt;
        </button>
        {categories.slice(currentIndex, currentIndex + 5).map((category) => (
          <div key={category.id} className="categoryCard">
            <NavLink to={`/category/${category.name}/?p=1`}>
              <h3>{category.name}</h3>
            </NavLink>
            <p>{category.description}</p>
          </div>
        ))}
        <button className="arrowButton" onClick={showNextCategory}>
          {" "}
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CategoriesPanel;
