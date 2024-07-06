import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";

const LessonForm = ({ lId, sectionId, initialData, onSubmit, index }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(
    initialData ? initialData.description : ""
  );
  const [uploading, setuploading] = useState(false);

  const [lessonId, setLessonId] = useState(lId);
  const [isOpen, setIsOpen] = useState(false);
  const [free1, setfree1] = useState(initialData ? initialData.free : false);
  const [videoFile, setVideoFile] = useState(null);
  const token = localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState(Boolean(lessonId));
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(initialData.free);
    setfree1(initialData ? initialData.free : false);
  }, []);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    initialData.title = e.target.value;
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlefree1Change = (e) =>
    setfree1(e.target.checked ? e.target.checked : false);
  const handleFileChange = (e) => setVideoFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }
    try {
      const free = free1 ? free1 : false;
      const formData = {
        sectionId,
        title,
        description,
        free,
      };
      console.log(formData);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;

      if (isEdit) {
        if (!formData.sectionId) {
          delete formData.sectionId;
        }
        console.log({ ...formData, lessonId });
        response = await axios.post(
          "https://e-learning-platform-uwoj.onrender.com/lesson/update-lesson",
          { ...formData, lessonId },
          { headers }
        );
      } else {
        response = await axios.post(
          "https://e-learning-platform-uwoj.onrender.com/lesson/create-lesson",
          formData,
          { headers }
        );
      }
      if (response.data.status !== "CREATED" || response.data.status !== "OK") {
        setError(true);
      }
      if (!error && videoFile) {
        setuploading(true);
        const videoFormData = new FormData();
        videoFormData.append("video", videoFile);
        await axios.put(
          `https://e-learning-platform-uwoj.onrender.com/lesson/upload-video?lessonId=${
            response.data.data.id || lessonId
          }`,
          videoFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setuploading(false);
        toast.success("Video uploaded successfully.");
      }

      console.log(response.data);
      if (error) {
        toast.error("Failed to save lesson.");
        return;
      } else {
        toast.success("Lesson saved successfully.");
        setIsEdit(true);
        console.log(response.data.data.id);
        setLessonId(response.data.data.id);
        setError(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save lesson.");
    }
  };

  return (
    <div className="lesson-form-container">
      <div className="section-header" onClick={toggleDropdown}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="toggle"
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
            className="toggle"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}

        <h2 className="section-title">
          {isEdit ? "Update Lesson" : "Create New Lesson"}
          {` ${index + 1}`}
        </h2>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} className="lesson-form">
          <div className="lesson-form-group">
            <label>Title:</label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="lesson-form-group">
            <label>Description:</label>
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="lesson-form-group checkbox-group">
            {console.log(initialData.free)}
            <label htmlFor="freeCheckbox">free</label>
            <input
              name="free"
              type="checkbox"
              checked={free1}
              onChange={handlefree1Change}
              id="freeCheckbox"
            />
          </div>
          <div className="lesson-form-group">
            <label>Video:</label>
            <div className="image-container">
              <input name="video" type="file" onChange={handleFileChange} />
              {uploading && <Loader small={true} />}
            </div>
          </div>
          <button type="submit" className="submit-button">
            {isEdit ? "Update Lesson" : "Create Lesson"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LessonForm;
