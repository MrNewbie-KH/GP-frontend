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
  useEffect(() => {
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/course/public/get-courses/1")
      .then((response) => {
        // Handle successful response
        const list = response.data.data;
        setCourses(list); // Update state with fetched data
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="Home">
      <Header />
      <Hero />
      <Categories />
      {isLoading ? <Loader /> : <CoursesList courses={courses} />}
      <Footer />
    </div>
  );
}

export default Home;
