import React, { useState } from "react";
import Button from "./Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      console.log(response);
      if (response.data.status === "BAD_REQUEST") {
        console.log(response.data.status);
      } else if (response.data.status === "NOT_FOUND") {
        console.log(response.data.status);
      } else {
        // Assuming successful response, store the token in local storage
        const token = response.data.data;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
        console.log("Token stored successfully:", token);
      }
      setFormData(initialState);
    } catch (error) {
      console.error("Error:", error.message);
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
    </form>
  );
}

export default LogInForm;
