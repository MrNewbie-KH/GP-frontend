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
function CoursePage() {
  const [courseBasicInfo, setCourseBasicInfo] = useState(null);
  const [courseAllInfo, setCourseAllInfo] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState("overview");
  const [overviewData, setOverviewData] = useState(null);
  const [instructorInformation, setInstructorInformation] = useState(null);
  useEffect(() => {
    const getBasicData = async () => {
      try {
        const response = await fetch("http://localhost:3000/courseBasicInfo");
        const data = await response.json();
        setCourseBasicInfo(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getAllData = async () => {
      try {
        const response = await fetch("http://localhost:3000/courseAllInfo");
        const data = await response.json();
        setCourseAllInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getInstructorData = async () => {
      try {
        const response = await fetch("http://localhost:3000/instructors");
        const data = await response.json();
        setInstructorInformation(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getOverviewData = async () => {
      try {
        const response = await fetch("http://localhost:3000/overview");
        const data = await response.json();
        setOverviewData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getBasicData();
    getAllData();
    getOverviewData();
    getInstructorData();
  }, []);

  const renderContent = () => {
    switch (selectedPanel) {
      case "overview":
        return <OverviewContent information={overviewData}/>;
      case "courseContent":
        return <CourseContent information={courseAllInfo} />;
      case "instructors":
        return <InstructorsContent information={instructorInformation} />;
      case "reviews":
        return <ReviewsContent />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <MainCourseInfo/>
      <CourseCard information={courseBasicInfo} />
      <CoursePagePanel
        selectedPanel={selectedPanel}
        setSelectedPanel={setSelectedPanel}
      />
      {renderContent()}
    </>
  );
}

export default CoursePage;
