import Header from "../components/Home/Header";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import "./VideoPage.css";
import "./Home.css";
import CourseContent from "../components/CoursePage/CourseContent";
import QAndAContent from "../components/VideoPage/QAndAContent";
import NotesContent from "../components/VideoPage/NotesContent";
import { useEffect, useState } from "react";
import CoursePagePanel from "../components/CoursePage/CoursePagePanel";
function VideoPage() {
  const [courseBasicInfo, setCourseBasicInfo] = useState(null);
  const [courseAllInfo, setCourseAllInfo] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState("courseContent");
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
      case "qaa":
        return <QAndAContent information={overviewData}/>;
      case "courseContent":
        return <CourseContent information={courseAllInfo} />;
      case "notes":
        return <NotesContent information={instructorInformation} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="video-player-and-content">
        <VideoPlayer />
        <CoursePagePanel>
          <button
            className="btn panel-btn"
            onClick={() => setSelectedPanel("qaa")}
          >
            Q & A
          </button>
          <button
            className="btn panel-btn"
            onClick={() => setSelectedPanel("courseContent")}
          >
            Course content
          </button>
          <button
            className="btn panel-btn"
            onClick={() => setSelectedPanel("notes")}
          >
            Notes
          </button>

        </CoursePagePanel>
        {renderContent()}
      </div>
    </div>
  );
}
export default VideoPage;
