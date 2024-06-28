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
import axios from "axios";

function VideoPage() {
  const [video, setVideo] = useState("");
  const [selectedPanel, setSelectedPanel] = useState("courseContent");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getVideo = async () => {
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

    getVideo();
  }, []);

  const renderContent = () => {
    switch (selectedPanel) {
      case "qaa":
        return <QAndAContent id={id} />;
      case "courseContent":
        return <CourseContent information={id} />;
      case "notes":
        return <NotesContent lessonId={id} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="video-player-and-content">
        <div className="video-container">
          <iframe
            src={video}
            loading="lazy"
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
        <CoursePagePanel>
          <div className="course-page-panel">
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
          </div>
        </CoursePagePanel>
        {renderContent()}
      </div>
    </div>
  );
}
export default VideoPage;
