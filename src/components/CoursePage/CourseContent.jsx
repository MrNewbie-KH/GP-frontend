import SectionCard from "./SectionCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function CourseContent({ cid, vid, isSubscribed, information }) {
  const [token] = useState(localStorage.getItem("token"));

  const getData = async function () {};

  useEffect(() => {
    if (!information) {
      getData();
    }
  }, [information]);
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div className="course-content-section">
      {token
        ? information.sections &&
          information.sections.map((info, index) => (
            <>
              <SectionCard
                key={index}
                k={index}
                data={info}
                isSubscribed={information.isSubscribed}
                courseId={cid}
                videoId={vid}
                notGo={false}
              />
              {console.log(info)}
            </>
          ))
        : information.sections &&
          information.sections.map((info, index) => (
            <SectionCard
              key={index}
              k={index}
              data={info}
              isSubscribed={false}
              courseId={cid}
              videoId={vid}
              notGo={true}
            />
          ))}
    </div>
  );
}

export default CourseContent;
