import React, { useState } from "react";
import Button from "./Button.jsx";
import axios from "axios";
// -----------------------
const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
};
function SignupForm() {
  // state part
  const [formData, setFormData] = useState(initialState);
  const [messageState, setMessageState] = useState("");

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
        "https://e-learning-platform-uwoj.onrender.com/signup/custom",
        formData
      );
      if (response.data.status === "BAD_REQUEST") {
        console.log(response.data.status);
      } else if (response.data.status === "NOT_FOUND") {
        console.log(response.data.status);
      } else {
        // Assuming successful response, store the token in local storage
        const token = response.data.data;
        localStorage.setItem("token", token);
        console.log("Token stored successfully:", token);
      }
      setFormData(initialState);
      navigate("/login");
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
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formRow">
        <div className="names">
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
      <div className="formRow">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formRow">
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="formRow">
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div> */}
      <Button type="submit">Create account</Button>
    </form>
  );
}

export default SignupForm;
