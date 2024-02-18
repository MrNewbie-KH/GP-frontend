import React, { useState } from "react";
import style from "./LogInForm.module.css";
import Button from "./Button.jsx";
function LogInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formRow}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
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

// 1- provide field email, f-name, l-name ,password, phone! , birthday! , photo!
