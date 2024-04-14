import { useEffect,useState } from "react";
import CourseCard from "../components/CoursePage/CourseCard";
import Header from "../components/Home/Header";

function CoursePage() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/courseInfo");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <CourseCard information={data} />
    </>
  );
}
export default CoursePage;
