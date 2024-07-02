import React, { useState, useEffect } from "react";
import "./Courses.css";
import Header from "./../components/Home/Header";
import CourseList from "./../components/Courses/CoursesList";
import CategoryTitle from "../components/Courses/CategoryTitle";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Loader from "./../components/Loader";
import Pagination from "./../components/Courses/Pagination";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  useEffect(() => {
    setSearchValue(searchParams.get("q"));
    let pageParam = searchParams.get("p");
    setCurrentPage(parseInt(pageParam, 10) || 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/course/public/search/${searchValue}/${
            currentPage - 1
          }`
        );
        setSearchResult(response.data.data);
        setTotalPages(response.data.numberOfPages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchValue) {
      fetchSearchResult();
    }
  }, [searchValue, currentPage]);

  const changeCurrentPage = async (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setLoading(true);
      navigate(`?q=${searchValue}&p=${page}`); // Update URL with searchValue and page
    }
  };

  return (
    <div>
      <Header />
      {error ? (
        <>
          <h1>Error</h1>
          <h2>Please try again</h2>
        </>
      ) : (
        <>
          <CategoryTitle title={searchValue} description={""} />
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className="total-courses">
                Showing {searchResult.length} results
              </p>
              <CourseList courses={searchResult} />
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

export default Courses;
