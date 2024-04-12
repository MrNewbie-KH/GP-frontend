import React from 'react';
import { useState } from 'react';
const categories = [
  { id: 1, name: 'Category 1', description: 'Description for category 1' },
  { id: 2, name: 'Category 2', description: 'Description for category 2' },
  { id: 3, name: 'Category 3', description: 'Description for category 3' },
  { id: 4, name: 'Category 4', description: 'Description for category 4' },
  { id: 5, name: 'Category 5', description: 'Description for category 5' },
  { id: 6, name: 'Category 6', description: 'Description for category 6' },
  { id: 7, name: 'Category 7', description: 'Description for category 7' },
];

const CategoriesPanel = () => {
  const [rightIndex, setRightIndex] = useState(4);
  const [leftIndex, setLeftIndex] = useState(0);

  const showNextCategory = () => {
    setRightIndex((rightIndex) => {
      if (rightIndex !== categories.length -1) {
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
      <div className="categoriesPanel">
      <button className="arrowButton" onClick={showPreviousCategory}> &lt;</button>
        {categories.slice(leftIndex, rightIndex).map((category) => (
          <div key={category.id} className="categoryCard">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
        <button className="arrowButton" onClick={showNextCategory}> &gt;</button>
      </div>
    </div>
  );
};

export default CategoriesPanel;
