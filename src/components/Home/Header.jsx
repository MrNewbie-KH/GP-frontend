// Header.js
import React, { useState } from "react";
import Search from "../Search/Search";

const Header = ({ onSearched }) => {
  const passdata = (searchValue) => {
    onSearched(searchValue);
  };

  return (
    <header className="header">
      <div className="logo">Zakker</div>
      <div className="header-search">
        <Search onSearch={passdata} />
      </div>
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
