import React, { useState } from "react";
import LessonLink from "./LessonLink";
function SectionCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function calcDuration(obj){
  let ctr =0;
  for(let i=0;i<obj.lessons.length;i++){
    ctr+=obj.lessons[i].duration
  }
  return ctr;
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
          <p>{data.section}</p>
        </div>
        <div>
          <p>{data.lessons && data.lessons.length} lessons</p>
          <p>{data.lessons && calcDuration(data)} Minutes</p>
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
