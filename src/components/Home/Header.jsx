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
      <div className="logo">
        <NavLink to="/">Zakker</NavLink>
      </div>
      <div className="header-search">
        <Search onSearch={passdata} />
      </div>
      <NavLink to="/courses">
        <a href="#">Categories</a>
      </NavLink>
      {/*conditinal rendering if has token */}
      <a href="#">My Courses</a>
      {/*conditinal rendering if no token */}
      <NavLink to="/login">
        <button className="btn btn-primary">Login </button>
      </NavLink>
      <NavLink to="/signup">
        <button className="btn btn-primary"> Sign up</button>
      </NavLink>
    </header>
  );
};

export default Header;
