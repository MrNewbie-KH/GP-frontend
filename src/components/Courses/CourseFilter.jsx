import React from "react";

const CourseFilter = ({ filters, onFilterChange, onShowResults }) => {
  const handleShowResults = () => {
    onShowResults();
  };

  return (
    <div className="filters">
      <select
        name="category"
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        <option value="">Select Category</option>
        {/* Populate categories dynamically */}
      </select>
      <select
        name="rating"
        value={filters.rating}
        onChange={(e) => onFilterChange("rating", e.target.value)}
      >
        <option value="">Select Rating</option>
        {/* Populate ratings dynamically */}
      </select>
      <select
        name="instructor"
        value={filters.instructor}
        onChange={(e) => onFilterChange("instructor", e.target.value)}
      >
        <option value="">Select Instructor</option>
        {/* Populate instructors dynamically */}
      </select>
      <select
        name="duration"
        value={filters.duration}
        onChange={(e) => onFilterChange("duration", e.target.value)}
      >
        <option value="">Select Duration</option>
        {/* Populate durations dynamically */}
      </select>

      <button onClick={handleShowResults}>Show Results</button>
    </div>
  );
};

export default CourseFilter;
