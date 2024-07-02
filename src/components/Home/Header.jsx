import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import axios from "axios";
import CartCourseCard from "../Cart/CartCourseCard";

const Header = (changed) => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const isloggedin = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    if (isloggedin) {
      countCart();
    }
  }, [isloggedin, changed]);

  const logOut = () => {
    localStorage.removeItem("token");
  };

  const countCart = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/user/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const list = response.data.data;
        setItems(list);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const handleMouseOver = () => {
    document.getElementById("courses-list").style.display = "block";
  };

  const handleMouseOut = () => {
    document.getElementById("courses-list").style.display = "none";
  };
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className={"logo-link"}>
          Zakker
        </NavLink>
      </div>
      <div className="header-search">
        {location.pathname !== "/" && <Search />}
      </div>

      {/*conditinal rendering if has token */}
      {isloggedin ? (
        <div className="loggedin">
          <NavLink to="/category/all" className="categories">
            Categories
          </NavLink>
          <NavLink to="/mycourses">My Courses</NavLink>
          <NavLink to="/mycourses/wishlist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </NavLink>
          <div className="cart-container">
            <NavLink
              to="/cart"
              className="test"
              onMouseOver={(countCart, handleMouseOver)}
              onMouseOut={handleMouseOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div id="cart-count" className="cart-count">
                {items.length}
              </div>
              <div id="courses-list" className="courses-list">
                {items.length > 0 &&
                  items.slice(0, 4).map((item) => (
                    <NavLink key={item.id}>
                      {" "}
                      <CartCourseCard key={item.id} course={item} />
                    </NavLink>
                  ))}
                {items.length > 4 && (
                  <NavLink to="/cart">
                    <div className="show-more">Show more</div>
                  </NavLink>
                )}
              </div>
            </NavLink>
          </div>

          <NavLink to="/profile">
            <div className="profile-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Adding the pop up window on hover */}
              <div className="popup">
                <div className="popup-section">
                  <Link>My Learning</Link>
                  <Link to="/cart">My Cart</Link>

                  <Link to="/mylearning">Wishlist</Link>
                  <Link>Dasboard</Link>
                </div>
                <div className="popup-section">
                  <Link>Account settings</Link>
                  <Link to="/edit-profile">Edit profile</Link>
                  <Link to="/profile">Public profile</Link>
                </div>
                <NavLink to="/login" onClick={logOut}>
                  Log out
                </NavLink>
              </div>
            </div>

            {/* -------------- */}
          </NavLink>
        </div>
      ) : (
        <>
          <NavLink to="/login">
            <button className="btn btn-primary">Login </button>
          </NavLink>
          <NavLink to="/signup">
            <button className="btn btn-primary"> Sign up</button>
          </NavLink>
        </>
      )}

      {/*conditinal rendering if no token */}
    </header>
  );
};

export default Header;
