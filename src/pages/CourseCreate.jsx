import React, { useEffect, useState } from "react";
import "./CourseCreate.css";
import CourseForm from "../components/Dashboard/CourseForm";
import SectionForm from "../components/Dashboard/SectionForm";
import LessonForm from "../components/Dashboard/LessonForm";
import { useParams } from "react-router-dom";
import Header from "./../components/Home/Header";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const CourseCreate = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    whatYouWillLearn: "",
    prerequisite: "",
    language: "",
    level: "",
    price: 0,
    categories: [0],
    tags: [""],
  });
  const [courseId, setCourseId] = useState(null);
  const [sections, setSections] = useState([]);
  let { cid, sid, lid } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Course Management - Zakker";

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
        console.log(response.data);
        setData(response.data.data);
        setCourseId(response.data.data.id);
        setSections(response.data.data.sections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <h1>Course Management</h1>
      <CourseForm
        profile={data}
        id={cid ? +cid : +courseId}
        initialData={data}
        sections={sections}
        //initialData={/* fetch course data if editing */}
        onSubmit={(data) =>
          setCourseId(courseId ? courseId : cid ? +cid : data.id)
        }
      />
    </div>
  );
};

export default CourseCreate;
