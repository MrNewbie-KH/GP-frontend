import "./Home.css";
import Footer from "./../components/Home/Footer";
import Header from "./../components/Home/Header";
import Hero from "./../components/Home/Hero.";
import Categories from "./../components/Home/Categories";
import CoursesList from "../components/Courses/CoursesList";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../components/Loader";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, [currentPage]);

  
  const changeCurrentPage = async (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setIsLoading(true);
    }
  };
  return (
    <div className="Home">
      <Header />
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
        />
      )}
      <Footer />
    </div>
  );
}

export default Home;
