import React, { useState } from "react";
import style from "./LogInForm.module.css";
import Button from "./Button.jsx";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

function LogInForm() {
  // state part
  const [formData, setFormData] = useState(initialState);

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
        "http://localhost:3000/login",
        formData
      );
      console.log("Registered successfully with data:", response);
      if (response.message == "Wrong Password!") {
        console.log("Wrong Password!");
      } else if (response.status == "User not found!") {
        console.log("User not found!");
      }

      setFormData(initialState);
    } catch (error) {
      console.error("Error  :", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formRow}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className={style.test}
          placeholder="test@test.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formRow}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          className={style.test}
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Log In</Button>
    </form>
  );
}

export default LogInForm;
