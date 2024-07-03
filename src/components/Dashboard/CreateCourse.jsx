import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./../Home/Footer";

const CreateCourse = (profile) => {
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
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!token) {
      console.log("token not found");
      toast("Login First");
    } else {
      setLogged(true);
    }
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-learning-platform-uwoj.onrender.com/category/all"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
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
      const response1 = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/course/create-course",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Course created successfully:", response1.data.data);
      if (response1.data.status !== "OK") {
        toast.error("Inputs are not valid");
        return;
      }
      const response2 = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/course/add-instructor",
        {
          courseId: response1.data.data.id,
          instructorEmail: profile.profile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Course created successfully:", response2.data);
      if (response2.data.status !== "OK") {
        toast.error("Failed");
        return;
      }
      setSuccess(true);
      toast.success("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  return (
    <>
      {logged && !success ? (
        <>
          <div className="create-course-container">
            <h1>Create New Course</h1>
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>What You Will Learn:</label>
                <input
                  type="text"
                  name="whatYouWillLearn"
                  value={courseData.whatYouWillLearn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prerequisite:</label>

                <input
                  type="text"
                  name="prerequisite"
                  value={courseData.prerequisite}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Language:</label>
                <input
                  type="text"
                  name="language"
                  value={courseData.language}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Level:</label>
                <input
                  type="text"
                  name="level"
                  value={courseData.level}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categories:</label>
                <select
                  name="categories"
                  value={courseData.categories[0]}
                  onChange={(e) => handleArrayChange(e, 0, "categories")}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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

export default CreateCourse;
