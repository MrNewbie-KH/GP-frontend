import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./../Home/Footer";

const CreateSection = (profile) => {
  const [courseData, setCourseData] = useState({
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

  const token = localStorage.getItem("token");
  const [logged, setLogged] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (!token) {
      console.log("token not found");
      toast("Login First");
    } else {
      setLogged(true);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const newArray = [...courseData[arrayName]];
    newArray[index] = value;
    setCourseData({
      ...courseData,
      [arrayName]: newArray,
    });
  };

  const addArrayItem = (arrayName) => {
    setCourseData({
      ...courseData,
      [arrayName]: [...courseData[arrayName], ""],
    });
  };

  const removeArrayItem = (index, arrayName) => {
    const newArray = courseData[arrayName].filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      [arrayName]: newArray,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("token not found");
      toast("Login First");
      return;
    }
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/course/create-course",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  return (
    <>
      {logged ? (
        <>
          <div className="create-course-container">
            <h1>Create New Course</h1>
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label>Tags:</label>
                <div className="dynamic-input-container">
                  {courseData.tags.map((tag, index) => (
                    <div key={index} className="dynamic-input">
                      <input
                        type="text"
                        name="tags"
                        value={tag}
                        onChange={(e) => handleArrayChange(e, index, "tags")}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "tags")}
                        className="remove-button"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("tags")}
                    className="add-btn"
                  >
                    Add More
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Create Course
              </button>
            </form>
          </div>
          <Footer />
        </>
      ) : success ? (
        <h1>Course created successfully</h1>
      ) : (
        <>
          <h1>Login First</h1>
        </>
      )}
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default CreateSection;
