import React from "react";

const CoursesFilter = (props) => {
  const renderStars = (rating) => {
    const filledStars = "★".repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? "½" : "";
    const emptyStars = "☆".repeat(5 - Math.ceil(rating));
    return filledStars + halfStar + emptyStars;
  };

  return (
    <div className="filters">
      <select
        name="category"
        onChange={(e) => props.onchange("category", e.target.value)}
      >
        <option value="">Select Category</option>
        {props.filtersData.category.map(
          (category, index) =>
            category && (
              <option key={index} value={category}>
                {category}
              </option>
            )
        )}
      </select>

      <select
        name="rating"
        onChange={(e) => props.onchange("rating", e.target.value)}
      >
        <option value="">Select Rating</option>
        {props.filtersData.rating.map(
          (rating, index) =>
            rating && (
              <option key={index} value={rating}>
                {rating + " " + renderStars(rating)}
              </option>
            )
        )}
      </select>

      <select
        name="duration"
        onChange={(e) => props.onchange("duration", e.target.value)}
      >
        <option value="">Select Duration</option>
        {props.filtersData.duration.map(
          (duration, index) =>
            duration && (
              <option key={index} value={duration}>
                {duration} Hours
              </option>
            )
        )}
      </select>

      <select
        name="level"
        onChange={(e) => props.onchange("level", e.target.value)}
      >
        <option value="">Select Level</option>
        level&&
        {props.filtersData.level.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        name="price"
        onChange={(e) => props.onchange("price", e.target.value)}
      >
        <option value="">Select Price</option>
        {props.filtersData.price.map(
          (price, index) =>
            price && (
              <option key={index} value={price}>
                {price}
              </option>
            )
        )}
      </select>

      <select
        name="language"
        onChange={(e) => props.onchange("language", e.target.value)}
      >
        <option value="">Select Language</option>
        {props.filtersData.language.map(
          (language, index) =>
            language && (
              <option key={index} value={language}>
                {language}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default CoursesFilter;
