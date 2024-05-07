import axios from "axios";
import React, { useEffect, useState } from "react";
function EditData() {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    about: "",
    paypalEmail: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-learning-platform-uwoj.onrender.com/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        const { firstName, lastName, about, paypalEmail, phoneNumber } =
          response.data.data;
        setFormData({
          firstName,
          lastName,
          about,
          paypalEmail,
          phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(formData);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="edit-profile-data">
      <form className="profile-info" onSubmit={handleSubmit}>
        <div className="input-part">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="01123456789"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="about">About</label>
          <input
            type="text"
            name="about"
            placeholder="write bio about yourself"
            value={formData.about}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="paypalEmail">Paypal</label>
          <input
            type="text"
            name="paypalEmail"
            placeholder="paypal@business.com"
            value={formData.paypalEmail}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditData;
