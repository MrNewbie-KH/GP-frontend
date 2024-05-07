import { useEffect, useState } from "react";
import CourseCard from "../components/CoursePage/CourseCard";
import CourseContent from "../components/CoursePage/CourseContent";
import OverviewContent from "../components/CoursePage/OverViewContent";
import MainCourseInfo from "../components/CoursePage/MainCourseInfo";
import InstructorsContent from "../components/CoursePage/InstructorContent";
import ReviewsContent from "../components/CoursePage/ReviewContent";
import CoursePagePanel from "../components/CoursePage/CoursePagePanel";
import Header from "../components/Home/Header";
import "./CoursePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
function CoursePage() {
  const courseId = useParams();
  const token = localStorage.getItem("token");
  const [courseData, setCoursedata] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/course/public/get-course/${courseId.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data.data);
        setCoursedata(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const renderContent = () => {
    switch (selectedPanel) {
      case "overview":
        return <OverviewContent information={courseData} />;
      case "courseContent":
        return <CourseContent information={courseData} />;
      case "instructors":
        return <InstructorsContent information={courseData} />;
      case "reviews":
        return (
          <ReviewsContent
            courseId={courseData.id}
            isSubscribed={courseData.isSubscribed}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainCourseInfo information={courseData} />
          <CourseCard information={courseData} />
          <CoursePagePanel
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          >
            <button
              className="btn panel-btn"
              onClick={() => setSelectedPanel("overview")}
            >
              Overview
            </button>
            <button
              className="btn panel-btn"
              onClick={() => setSelectedPanel("courseContent")}
            >
              Course content
            </button>
            <button
              className="btn panel-btn"
              onClick={() => setSelectedPanel("instructors")}
            >
              instructors
            </button>
            <button
              className="btn panel-btn"
              onClick={() => setSelectedPanel("reviews")}
            >
              reviews
            </button>
          </CoursePagePanel>
          {renderContent()}
        </>
      )}
    </>
  );
}

export default CoursePage;
