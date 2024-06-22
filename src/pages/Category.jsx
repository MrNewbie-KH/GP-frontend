import React, { useState, useEffect } from "react";
import "./Courses.css";
import Header from "./../components/Home/Header";
import CourseList from "./../components/Courses/CoursesList";
import CategoryTitle from "../components/Courses/CategoryTitle";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Loader from "./../components/Loader";
import Pagination from "./../components/Courses/Pagination";
import CategoriesPanel from "../components/Home/Categories";

const Category = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const arr = location.pathname.split("/");
  const p1 = arr.pop();
  const p2 = arr.pop();

  useEffect(() => {
    let pageParam = parseInt(searchParams.get("p"), 10);
    setCurrentPage(pageParam || 1);
    axios
      .get(
        `https://e-learning-platform-uwoj.onrender.com/course/public/get-by-category/${1002}/${
          currentPage - 1
        }`
      )
      .then((response) => {
        // Handle successful response
        const list = response.data.data;
        setCourses(list);
        setTotalPages(response.data.numberOfPages);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, [location, p2]);

  const changeCurrentPage = async (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setLoading(true);
      navigate(`/category/${p2}/?p=${page}`); // Update URL with searchValue and page
    }
  };

  return (
    <div>
      <Header />
      {error ? (
        <>
          <h1>Error {console.log(error)}</h1>
          <h2>Please try again</h2>
        </>
      ) : (
        <>
          <CategoriesPanel />
          <CategoryTitle title={p2} description={""} />
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <p className="total-courses">Showing {courses} results</p> */}
              <CourseList courses={courses} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changeCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
