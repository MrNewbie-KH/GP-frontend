import React, { useState } from "react";
import LessonLink from "./LessonLink";
function SectionCard({ data, isSubscribed }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // rubish
  function calcDuration(obj) {
    let ctr = 0;
    for (let i = 0; i < obj.lessons.length; i++) {
      ctr += obj.lessons[i].duration;
    }
    return ctr;
  }

  function formatDuration(seconds) {
    const pad = (num) => String(num).padStart(2, "0");

    if (seconds < 3600) {
      const minutes = Math.ceil(seconds / 60);
      return `${pad(minutes)}`;
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
          <p>{data.title}</p>
        </div>
        <div>
          <p>{data.numberOfLessons && data.numberOfLessons} lessons</p>
          <p>{data.duration ? formatDuration(data.duration) : ""} Minutes</p>
        </div>
      </div>
      {isOpen && (
        <div className="section-content">
          {data.lessons.map((lesson, index) => (
            <LessonLink key={index} data={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SectionCard;
