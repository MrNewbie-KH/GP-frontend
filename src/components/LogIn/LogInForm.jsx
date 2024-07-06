import React, { useState } from "react";
import Button from "./Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {} from "@fortawesome/react-fontawesome";

const initialState = {
  email: "",
  password: "",
};

function LogInForm() {
  // state part
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const [visible, useVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/login/custom",
        formData
      );
      if (response.data.status === "OK") {
        const token = response.data.data;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
      } else if (
        response.data.status === "NOT_FOUND" ||
        response.data.status === "BAD_REQUEST"
      ) {
        toast.error(response.data.message);
        setFormData(initialState);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Something went wrong , please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formRow">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="test"
          placeholder="test@test.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formRow">
        <label>Password:</label>
        <input
          type={visible ? "text" : "password"}
          name="password"
          className="test"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* <div className="password-icon">
          <FontAwesomeIcon
            icon={visible ? faEyeSlash : faEye}
            onClick={() => useVisible(!visible)}
          />
        </div> */}
      </div>
      <Button type="submit">Log In</Button>
      <ToastContainer position="bottom-center" />
    </form>
  );
}

export default LogInForm;
