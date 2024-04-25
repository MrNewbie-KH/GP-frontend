// Header.js
import React from "react";
import { Link,NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">Zakker</NavLink>
      </div>
      <div className="nav">
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
