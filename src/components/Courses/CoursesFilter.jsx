import React, { useState, useEffect } from "react";

const CoursesFilter = (props) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    rating: "",
    duration: "",
    level: "",
    price: "",
  });
  const [filtersData, setFiltersData] = useState({
    category: [],
    language: [],
    rating: ["1.0", "2.0", "3.0", "4.0", "5.0"],
    duration: ["0-5", "5-10"],
    level: ["Beginner", "Intermediate", "Expert"],
    price: ["Free", "Paid"],
  });

  useEffect(() => {
    setCourses(props.data);
  });
  useEffect(() => {
    if (courses.length > 0) fetchfiltersData();
  }, [courses]);

  useEffect(() => {
    applyFilters();
  }, [courses, filters]);
  useEffect(() => {
    props.onfilter(filteredCourses);
  });
  //fetch the filters of courses avaliable
  const fetchfiltersData = () => {
    setFiltersData({
      ...filtersData,
      category: [...new Set(courses.map((course) => course.category))],
      language: [...new Set(courses.map((course) => course.language))],
    });
  };

  // do the filters on courses and set the result
  const applyFilters = () => {
    let filteredResults = [...courses];

    if (filters.category) {
      filteredResults = filteredResults.filter(
        (course) => course.category === filters.category
      );
    }

    if (filters.rating) {
      filteredResults = filteredResults.filter(
        (course) => course.rating === filters.rating
      );
    }

    if (filters.duration) {
      filteredResults = filteredResults.filter(
        (course) => course.duration === filters.duration
      );
    }

    if (filters.level) {
      filteredResults = filteredResults.filter(
        (course) => course.level === filters.level
      );
    }

    if (filters.price) {
      filteredResults = filteredResults.filter(
        (course) => course.price === filters.price
      );
    }

    if (filters.language) {
      filteredResults = filteredResults.filter(
        (course) => course.language === filters.language
      );
    }
    setFilteredCourses(filteredResults);
  };

  //changing filters value as user change it
  const onchange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  //showing number of stars
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
        onChange={(e) => onchange("category", e.target.value)}
      >
        <option value="">Select Category</option>
        {filtersData.category.map(
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
        onChange={(e) => onchange("rating", e.target.value)}
      >
        <option value="">Select Rating</option>
        {filtersData.rating.map(
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
        onChange={(e) => onchange("duration", e.target.value)}
      >
        <option value="">Select Duration</option>
        {filtersData.duration.map(
          (duration, index) =>
            duration && (
              <option key={index} value={duration}>
                {duration} Hours
              </option>
            )
        )}
      </select>

      <select name="level" onChange={(e) => onchange("level", e.target.value)}>
        <option value="">Select Level</option>
        level&&
        {filtersData.level.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select name="price" onChange={(e) => onchange("price", e.target.value)}>
        <option value="">Select Price</option>
        {filtersData.price.map(
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
        onChange={(e) => onchange("language", e.target.value)}
      >
        <option value="">Select Language</option>
        {filtersData.language.map(
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
