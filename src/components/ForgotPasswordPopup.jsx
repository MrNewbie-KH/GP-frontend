import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

const ForgotPasswordPopup = () => {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://e-learning-platform-uwoj.onrender.com/forget-password`,
        { email: emailInput }
      );
      console.log(emailInput);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className="forgot-password"
      >
        Forgot Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address below. A
            password reset link will be sent to your email.
          </DialogContentText>
          <form>
            <div className="formRow">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="test"
                placeholder="test@test.com"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
                required
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
            color="primary"
          >
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordPopup;
