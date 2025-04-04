import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling

function UpdatePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState(""); // State to store current password
  const [newPassword, setNewPassword] = useState(""); // State to store new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to store confirmed password
  const navigate = useNavigate(); // Initialises the navigate function from the useNavigate hook

  // Sends a PUT request to the API to update the user's password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await axios.put('/api/users/updatepassword', {
        currentPassword, // Passes the current password
        newPassword // Passes the new password
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        alert(response.data.message);
        navigate("/main/profile");

    } catch (error) {
        alert(error.response.data.message);
    }
  };

  return (
    <Container>
        <Link to = "/main/profile" className = "back-link">← Back to Profile</Link>
        <Typography variant = 'h2' fontWeight = '600' sx = {{ color: theme.palette.text.primary }}>Update Password</Typography>
        <form onSubmit = {handleSubmit}> {/* Calls handleSubmit on form submission */}
            <Container>
                <TextField
                required
                type = "password"
                value = {currentPassword} // Gets value from currentPassword state
                label = "Current Password"
                onChange = {(e) => setCurrentPassword(e.target.value)} // Updates currentPassword state on input change
                fullWidth
                margin="normal"
                />
            </Container>
            <Container>
                <TextField
                required
                type = "password"
                value = {newPassword} // Gets value from newPassword state
                label = "New Password"
                onChange = {(e) => setNewPassword(e.target.value)} // Updates newPassword state on input change
                fullWidth
                margin="normal"
                />
            </Container>
            <Container>
                <TextField
                required
                type = "password"
                value = {confirmPassword} // Gets value from confirmPassword state
                label = "Confirm Password"
                onChange = {(e) => setConfirmPassword(e.target.value)} // Updates confirmPassword state on input change
                fullWidth
                margin="normal"
                />
            </Container>
            <Button variant = 'contained' type = "submit">Update Password</Button> {/* Submits form */}
        </form>
    </Container>
  );
}

export default UpdatePasswordPage;