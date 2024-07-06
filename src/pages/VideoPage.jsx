import Header from "../components/Home/Header";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import "./VideoPage.css";
import "./Home.css";
import CourseContent from "../components/CoursePage/CourseContent";
import QAndAContent from "../components/VideoPage/QAndAContent";
import NotesContent from "../components/VideoPage/NotesContent";
import { useEffect, useState } from "react";
import CoursePagePanel from "../components/CoursePage/CoursePagePanel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function VideoPage() {
  const [video, setVideo] = useState("");
  const [information, setInformation] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState("courseContent");
  const { cid, vid } = useParams();
  const token = localStorage.getItem("token");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [title, setTitle] = useState("");
  const nav = useNavigate();
  useEffect(() => {}, [selectedPanel]);
  useEffect(() => {
    if (cid) {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://e-learning-platform-uwoj.onrender.com/course/public/get-course/${cid}`,
            {
              headers: {
                ...(token !== null && { Authorization: `Bearer ${token}` }),
              },
            }
          );
          if (response.data.status !== "OK") {
            nav("/not-found");
          }
          setInformation(response.data.data);
          setIsSubscribed(response.data.data.isSubscribed);
          response.data.data.sections.map((section) =>
            section.lessons.map((lesson) =>
              lesson.id === +vid ? setTitle(lesson.title) : null
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
          nav("/not-found");
        }
      };

      getData();
    }
  }, [cid, vid, token]);
  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/lesson/get-lesson?lessonId=${vid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === "UNAUTHORIZED") {
          toast.error("Buy Course to watch videos");
        } else if (response.data.status === "NOT_FOUND") {
          toast.error("Video not found");
        } else if (response.data.status === "OK") {
          setVideo(response.data.data.videoUrl);
          return;
        }
        toast.error("Something went wrong");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      }
    };
    getVideo();
  }, [cid, vid, token]);
  const renderContent = () => {
    switch (selectedPanel) {
      case "qaa":
        return <QAndAContent id={vid} />;
      case "courseContent":
        return <CourseContent cid={cid} vid={vid} information={information} />;
      case "notes":
        return <NotesContent lessonId={vid} />;
      default:
        return null;
    }
  };
  document.title = title;
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
            {isSubscribed && (
              <button
                className={`btn panel-btn  ${
                  selectedPanel === "qaa" ? "panel-active" : "inactive"
                }`}
                onClick={() => setSelectedPanel("qaa")}
              >
                Q & A
              </button>
            )}
            <button
              className={`btn panel-btn  ${
                selectedPanel === "courseContent" ? "panel-active" : "inactive"
              }`}
              onClick={() => setSelectedPanel("courseContent")}
            >
              Course content
            </button>
            {isSubscribed && (
              <button
                className={`btn panel-btn  ${
                  selectedPanel === "notes" ? "panel-active" : "inactive"
                }`}
                onClick={() => setSelectedPanel("notes")}
              >
                Notes
              </button>
            )}
          </div>
        </CoursePagePanel>
        <ToastContainer position="bottom-center" />
        {renderContent()}
        <div style={{ margin: "30%" }}>Zakker</div>
      </div>
    </div>
  );
}
export default VideoPage;
