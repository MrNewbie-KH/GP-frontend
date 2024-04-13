// Header.js
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Zakker</div>
      <nav className="nav">
        <a href="#">Categories</a>
        <a href="#">My Courses</a>
        <a href="#">Sign In</a>
        <a href="#" className="btn btn-primary">
          Sign Up
        </a>
      </nav>
    </header>
  );
};

export default Header;
