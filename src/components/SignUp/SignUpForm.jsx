import React, { useState } from "react";
import Button from "./Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// import { Link,navigate } from "react-router-dom";
// -----------------------
const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  phoneNumber: "",
};

function SignupForm() {
  // state part
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
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
        "https://e-learning-platform-uwoj.onrender.com/signup",
        formData
      );
      if (response.data.status === "BAD_REQUEST") {
        toast.error(
          (response.data.data && response.data.data.password) ||
            response.data.message
        );
      } else {
        setFormData(initialState);
        toast.success("Verification link has been sent to your email");

        setTimeout(() => {
          navigate("/login");
        }, 6000);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
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
            placeholder="at least one number, one upper, one lower, and be at least 8 characters long"
          />
        </div>
        <div className="formRow">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Create account</Button>
        <ToastContainer position="bottom-center" />
      </form>
    </div>
  );
}

export default SignupForm;
