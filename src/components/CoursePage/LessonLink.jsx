import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function LessonLink({
  data,
  isSubscribed,
  courseId,
  videoId,
  onClick,
  isActive,
}) {
  function formatDuration(seconds) {
    const pad = (num) => String(num).padStart(2, "0");

    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${pad(minutes)}:${pad(remainingSeconds)}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours}hr${remainingMinutes}min`;
    }
  }
  // useEffect(() => {
  //   if (+videoId === data.id) {
  //     console.log("videoId ", videoId, data.id);

  //     document.getElementById("lesson-card").classList.add("active-lesson");
  //   } else {
  //     document.getElementById("lesson-card").classList.remove("active-lesson");
  //     console.log("2");
  //   }
  // }, [videoId, data.id]);

  return (
    <NavLink to={`/video/${courseId}/${data.id}`}>
      <div
        className={
          isActive ? "lesson-card-viewer active-lesson" : "lesson-card-viewer"
        }
        onClick={onClick}
      >
        {/* <div
      className={`lesson-link ${isActive ? "active-lesson" : ""}`}
      onClick={onClick}
    > */}
        <div className="lesson-title">
          <span>
            {data.type === "text" ? (
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
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
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            )}
          </span>
          <p>{data.title}</p>
        </div>
        <p>{data.duration ? formatDuration(data.duration) : " "}</p>
      </div>
    </NavLink>
  );
}

export default LessonLink;
