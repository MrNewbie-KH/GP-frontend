import React, { useEffect, useState } from "react";
import LessonLink from "./LessonLink";
import { ToastContainer, toast } from "react-toastify";

function SectionCard({ k, data, isSubscribed, courseId, videoId, notGo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(videoId);
  useEffect(() => {
    if (k === 0) {
      setIsOpen(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLessonClick = (lessonId) => {
    if (notGo) {
      toast("Login First");
      return;
    }
    setActiveLessonId(lessonId);
  };
  useEffect(() => {
    handleLessonClick(+videoId);
  }, [videoId]);

  function formatDuration(seconds) {
    const pad = (num) => String(num).padStart(2, "0");
    console.log(data.title, seconds);
    if (seconds < 3600) {
      const minutes = Math.ceil(seconds / 60);
      return `${pad(minutes)} min`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours}hr${remainingMinutes}min`;
    }
  }

  return (
    <div className="section-card">
      <div className="section-card-header" onClick={toggleDropdown}>
        <div className="section-name">
          <span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </span>
          <div>
            <p>{data.title}</p>
            <span>{data.description}</span>
          </div>
        </div>
        <div>
          <p>{data.numberOfLessons && data.numberOfLessons} lessons</p>
          <p>{data.duration ? `${formatDuration(data.duration)}` : ""}</p>
        </div>
      </div>
      {isOpen && (
        <div className="section-content">
          {data.lessons.map((lesson, index) => (
            <LessonLink
              key={index}
              data={lesson}
              view={isSubscribed || lesson.free}
              courseId={courseId}
              videoId={videoId}
              onClick={() =>
                (isSubscribed || lesson.free) && handleLessonClick(lesson.id)
              }
              isActive={activeLessonId === lesson.id}
              notGo={notGo}
            />
          ))}
        </div>
      )}
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default SectionCard;
