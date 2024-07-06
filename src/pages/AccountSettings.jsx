import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import "./AccountSettings.css"; // Import the CSS file
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AccountSettings = () => {
  //const [oldPassword, setOldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const [log, setLog] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      setToken(searchParams.get("token"));
      setLog(true);
    }
    document.title = "Account Settings - zakker";
  }, [token, searchParams]);

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
        if (response.data.data.message === "User not found") {
          setErrorMessage("User not found");
          setSuccessMessage(null);
          return;
        }
        setErrorMessage(
          response.data.data.password || "An error occurred. Please try again."
        );
        setSuccessMessage(null);
      } else if (response.data.status === "OK") {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage(null);

        if (log) {
          toast.success("Login with your new password");
          setErrorMessage(null);
          setLog(false);
          setTimeout(() => {
            nav("/login");
          }, 5000);
        }

        setpassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setSuccessMessage(null);
      console.log(error);
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
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default AccountSettings;
