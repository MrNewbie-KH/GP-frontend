import Header from "../components/Home/Header";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import "./VideoPage.css";
import "./Home.css";
import CourseContent from "../components/CoursePage/CourseContent";
import QAndAContent from "../components/VideoPage/QAndAContent";
import NotesContent from "../components/VideoPage/NotesContent";
import { useEffect, useState } from "react";
import CoursePagePanel from "../components/CoursePage/CoursePagePanel";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
function VideoPage() {
  // const [courseBasicInfo, setCourseBasicInfo] = useState(null);
  // const [courseAllInfo, setCourseAllInfo] = useState(null);
  // const [selectedPanel, setSelectedPanel] = useState("courseContent");
  // const [overviewData, setOverviewData] = useState(null);
  // const [instructorInformation, setInstructorInformation] = useState(null);
  // ------------------------------
  const [video, setVideo] = useState("");
  // ------------------------------
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/lesson/get-lesson?lessonId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data.videoUrl);
        setVideo(response.data.data.videoUrl);
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
    getData();
  }, []);
  const renderContent = () => {
    switch (selectedPanel) {
      case "qaa":
        return <QAndAContent information={overviewData} />;
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

      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          // src="https://iframe.mediadelivery.net/embed/238983/5d375f3c-d4d1-46d7-bec5-929f39a0880e?autoplay=true"
          src="https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe?autoplay=true"
          loading="lazy"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            height: "100%",
            width: "50%",
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>

      <ReactPlayer
        url="https://iframe.mediadelivery.net/play/238983/5d375f3c-d4d1-46d7-bec5-929f39a0880e"

        // loading="lazy"
        // style={{ border: "none" }}
        // allowFullScreen={true}
        // allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      />

      {/* <ReactPlayer url="https://www.youtube.com/watch?v=pPStdjuYzSI" /> */}
      <div className="video-player-and-content">
        {/* <VideoPlayer /> */}
        {/* <iframe className="video-container" src={video} frameborder="0"></iframe> */}
        {/* <iframe src=" title="Video Player" /> */}

        {/* <CoursePagePanel>
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
        {renderContent()} */}
      </div>
    </div>
  );
}
export default VideoPage;
