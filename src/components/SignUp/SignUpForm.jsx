import React, { useState } from "react";
import style from "./SignUpForm.module.css";
import Button from "./Button.jsx";
function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    birthday: "",
    photo: null,
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
    <form onSubmit={handleSubmit} encType="">
      <div className={style.formRow}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formRow}>
        <div className={style.names}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className={style.formRow}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formRow}>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formRow}>
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formRow}>
        <label>Photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Create account</Button>
    </form>
  );
}

export default SignupForm;

// 1- provide field email, f-name, l-name ,password, phone! , birthday! , photo!
