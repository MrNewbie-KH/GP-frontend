import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };
  const navigate = useNavigate();
  const applySearch = () => {
    // onSearch(searchValue);
    navigate(`/courses/?q=${searchValue}&p=${1}`);
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
