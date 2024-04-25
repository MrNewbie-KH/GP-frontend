// Header.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "../Search/Search";

const Header = ({ onSearched }) => {
  const passdata = (searchValue) => {
    onSearched(searchValue);
  };

  return (
    <header className="header">
      <div className="nav">
        <div className="logo">
          {" "}
          <NavLink to="/">Zakker</NavLink>
        </div>
        <div className="header-search">
          <Search onSearch={passdata} />
        </div>
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
