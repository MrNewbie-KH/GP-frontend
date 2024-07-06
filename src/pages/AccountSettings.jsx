import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import "./AccountSettings.css"; // Import the CSS file
import axios from "axios";

const AccountSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  let { token } = localStorage.getItem("token");
  useEffect(() => {
    token = localStorage.getItem("token");
    document.title = "Account Settings - zakker";
  });
  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage(null);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await axios.post(
        `https://e-learning-platform-uwoj.onrender.com/change-password/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      if (response.data.status === "BAD_REQUEST") {
        console.log(response.data.data.password);
        setErrorMessage(
          response.data.data.password || "An error occurred. Please try again."
        );
        setSuccessMessage(null);
      } else if (response.data.status === "OK") {
        console.log(response.data);
        setSuccessMessage("Password changed successfully!");
        setErrorMessage(null);
        setOldPassword(""); // Clear input fields after successful change
        setpassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <section className="account-settings">
        <h1>Change Password</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="password-form" onSubmit={handleChangePassword}>
          {/* <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          /> */}
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Change Password</button>
        </form>
      </section>
    </>
  );
};

export default AccountSettings;
