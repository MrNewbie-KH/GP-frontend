import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CategoriesPanel = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
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
          <Link to={`courses/${category.name}`}>
            <div key={category.id} className="categoryCard">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </Link>
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
