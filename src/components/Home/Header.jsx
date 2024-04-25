// Header.js
<<<<<<< HEAD
import React from "react";
import { Link,NavLink } from "react-router-dom";
import React, { useState } from "react";
import Search from "../Search/Search";

const Header = ({ onSearched }) => {
  const passdata = (searchValue) => {
    onSearched(searchValue);
  };
=======
import React from "react";
import { Link,NavLink } from "react-router-dom";
import React, { useState } from "react";
import Search from "../Search/Search";

const Header = ({ onSearched }) => {
  const passdata = (searchValue) => {
    onSearched(searchValue);
  };
>>>>>>> list-courses

  return (
    <header className="header">
<<<<<<< HEAD
      <div className="logo">
        <NavLink to="/">Zakker</NavLink>
      </div>
      <div className="nav">
=======
      <div className="logo"> <NavLink to="/">Zakker</NavLink></div>
      <div className="header-search">
        <Search onSearch={passdata} />
      </div>
      <nav className="nav">
>>>>>>> list-courses
        <a href="#">Categories</a>
        <a href="#">My Courses</a>
        <NavLink to="/login">
          <button className="btn btn-primary">Login </button>
        </NavLink>
        <NavLink to="/signup">
          <button className="btn btn-primary"> Sign up</button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
