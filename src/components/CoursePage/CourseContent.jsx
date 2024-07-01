import SectionCard from "./SectionCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CourseContent({ cid, vid }) {
  const [information, setInformation] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
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
          setInformation(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      getData();
    }
  }, [token]);

  const getData = async function () {};
  if (!information) {
    getData();
  }
  return (
    <div className="course-content-section">
      {information.sections &&
        information.sections.map((info, index) => (
          <SectionCard
            key={index}
            k={index}
            data={info}
            isSubscribed={information.isSubscribed}
            courseId={cid}
            videoId={vid}
          />
        ))}
    </div>
  );
}

export default CourseContent;
