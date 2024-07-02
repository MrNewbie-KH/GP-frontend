import "./Home.css";
import Footer from "./../components/Home/Footer";
import Header from "./../components/Home/Header";
import Hero from "./../components/Home/Hero.";
import Categories from "./../components/Home/Categories";
import CoursesList from "../components/Courses/CoursesList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import Loader from "./../components/Loader";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [reload, setReload] = useState(false);
  const re = () => {
    setReload((reload) => !reload);
  };
  useEffect(() => {
    document.title = "Zakker";
  }, []);
  useEffect(() => {
    let pageParam = parseInt(searchParams.get("p"), 10);
    let token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
    setCurrentPage(pageParam || 1);
  }, [searchParams]);
  useEffect(() => {
    axios
      .get(
        `https://e-learning-platform-uwoj.onrender.com/course/public/get-courses/${
          currentPage - 1
        }`
      )
      .then((response) => {
        // Handle successful response
        const list = response.data.data;
        setCourses(list);
        setTotalPages(response.data.numberOfPages);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, [currentPage]);

  const changeCurrentPage = async (page) => {
    if (page !== currentPage) {
      navigate(`?p=${page}`);
      setCurrentPage(page);
      setIsLoading(true);
    }
  };
  return (
    <div className="Home">
      <Header changed={reload} />
      <Hero />
      <Categories />
      {isLoading ? (
        <Loader />
      ) : (
        <CoursesList
          courses={courses}
          totalPages={totalPages}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          reload={re}
        />
      )}
      <Footer />
    </div>
  );
}

export default Home;
