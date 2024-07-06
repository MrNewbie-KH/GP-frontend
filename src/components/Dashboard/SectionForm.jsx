import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LessonForm from "./LessonForm";

const SectionForm = ({ sId, courseId, initialData, onSubmit, index, open }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(
    initialData ? initialData.description : ""
  );
  const [components, setComponents] = useState(
    initialData?.lessons ? initialData.lessons : []
  );
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [sectionId, setSectionId] = useState(sId);
  const token = localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState(Boolean(sectionId));
  const toggleDropdown = () => setIsOpen(!isOpen);

  const addComponent = () => setComponents([...components, {}]);

  const removeComponent = () => setComponents(components.slice(0, -1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;

      if (isEdit) {
        console.log({
          sectionId,
          title,
          description,
        });
        response = await axios.post(
          "https://e-learning-platform-uwoj.onrender.com/update-section",
          {
            sectionId,
            title,
            description,
          },
          { headers }
        );
      } else {
        response = await axios.post(
          "https://e-learning-platform-uwoj.onrender.com/create-section",
          {
            courseId,
            title,
            description,
          },
          { headers }
        );
        setSectionId(response.data.data.id);
        console.log(response.data);
        const newSectionId = response.data.data.id;
        setIsEdit(Boolean(newSectionId));
        setComponents([{}]);
      }

      toast.success("Section saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save section.");
    }
  };

  return (
    <div className="sections-container">
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
        <h1 className="section-title">
          {isEdit ? "Update Section" : "Create New Section"} {index + 1}
        </h1>
      </div>
      {isOpen && (
        <div className="section-container">
          <div className="section-form-container">
            <form onSubmit={handleSubmit} className="section-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                {isEdit ? "Update Section" : "Create Section"}
              </button>
            </form>
          </div>
          {components.map((component, idx) => (
            <div key={idx} className="dynamic-component">
              <LessonForm
                courseId={courseId}
                sectionId={sectionId}
                lId={component.id}
                initialData={component}
                index={idx}
              />
            </div>
          ))}
          <button onClick={addComponent} className="add-btn">
            Add Lesson
          </button>
          <button onClick={removeComponent} className="remove-button">
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionForm;
