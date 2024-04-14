import React, { useState, useEffect } from "react";

const CategoriesPanel = () => {
  const [categories, setCategories] = useState([]);
  const [rightIndex, setRightIndex] = useState(4);
  const [leftIndex, setLeftIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const showNextCategory = () => {
    setRightIndex((rightIndex) => {
      if (rightIndex !== categories.length - 1) {
        setLeftIndex((leftIndex) => leftIndex + 1);
        return rightIndex + 1;
      }
      return rightIndex;
    });
  };

  const showPreviousCategory = () => {
    setLeftIndex((leftIndex) => {
      if (leftIndex !== 0) {
        setRightIndex((rightIndex) => rightIndex - 1);
        return leftIndex - 1;
      }
      return leftIndex;
    });
  };

  return (
    <div>
      <h2>Popular Categories</h2>
      <div className="categoriesPanel">
        <button className="arrowButton" onClick={showPreviousCategory}>
          {" "}
          &lt;
        </button>
        {categories.slice(leftIndex, rightIndex).map((category) => (
          <div key={category.id} className="categoryCard">
            <h3>{category.name}</h3>
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
