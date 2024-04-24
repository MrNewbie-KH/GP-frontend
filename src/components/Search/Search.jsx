import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const applySearch = () => {
    onSearch(searchValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      applySearch();
    }
  };

  return (
    <>
      <div className="search-bar">
        <div className="search-input-container">
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={applySearch}
          />

          <input
            type="text"
            placeholder="Search for courses"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          {/* <button className="btn search-btn" onClick={applySearch}>
            Search
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Search;
