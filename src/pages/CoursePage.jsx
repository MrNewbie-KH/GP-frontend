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
              ...(token !== null && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        console.log("response", response.data.data);
        setCoursedata(response.data.data);
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
            rating={courseData.averageRating}
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
            <div className="course-page-panel">
              <button
                className={`btn panel-btn ${
                  selectedPanel === "overview" ? "panel-active" : ""
                }`}
                onClick={() => setSelectedPanel("overview")}
              >
                Overview
              </button>
              <button
                className={`btn panel-btn ${
                  selectedPanel === "courseContent" ? "panel-active" : ""
                }`}
                onClick={() => setSelectedPanel("courseContent")}
              >
                Course Content
              </button>
              <button
                className={`btn panel-btn ${
                  selectedPanel === "instructors" ? "panel-active" : ""
                }`}
                onClick={() => setSelectedPanel("instructors")}
              >
                Instructors
              </button>
              <button
                className={`btn panel-btn ${
                  selectedPanel === "reviews" ? "panel-active" : ""
                }`}
                onClick={() => setSelectedPanel("reviews")}
              >
                Reviews
              </button>
            </div>
          </CoursePagePanel>
          {renderContent()}
        </>
      )}
    </>
  );
}

export default CoursePage;
