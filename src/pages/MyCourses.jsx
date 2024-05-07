import React, { useState } from "react";
import "./MyCourses.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./../components/Home/Header";

function MyCourses() {
  const location = useLocation();
  const arr = location.pathname.split("/");
  const p1 = arr.pop();
  const p2 = arr.pop();
  let activeTab = "";
  const handle = () => {
    if ((p1 === "" && p2 === "mycourses") || p2 === "") {
      activeTab = "mycourses";
    } else if (p1 === "wishlist" || p2 === "wishlist") {
      activeTab = "wishlist";
    } else activeTab = "archived";
  };
  handle();
  return (
    <>
      <Header />
      <div className="mycourses-container">
        <div className="mycourses-header">
          <div className="name">
            {activeTab === "mycourses"
              ? "My Learning"
              : activeTab === "wishlist"
              ? "Wishlist"
              : "Archived"}
          </div>
          <div className="tabs">
            <Link
              to="/mycourses"
              className={`tab ${
                activeTab === "mycourses" ? "active" : "inactive"
              }`}
            >
              My Learning
            </Link>
            <Link
              to="wishlist"
              className={`tab ${
                activeTab === "wishlist" ? "active" : "inactive"
              }`}
            >
              Wishlist
            </Link>
            <Link
              to="archived"
              className={`tab ${
                activeTab === "archived" ? "active" : "inactive"
              }`}
            >
              Archived
            </Link>
          </div>
        </div>
        <div className="tab-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MyCourses;
