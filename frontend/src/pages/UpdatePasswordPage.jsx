import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
        <Link to = "/main/profile" className = "back-link">← Back to Profile</Link>
        <h1>Update Password</h1>
        <form onSubmit = {handleSubmit}> {/* Calls handleSubmit on form submission */}
            <div>
                <label>Current Password:</label>
                <input
                type = "password"
                value = {currentPassword} // Gets value from currentPassword state
                onChange = {(e) => setCurrentPassword(e.target.value)} // Updates currentPassword state on input change
                required
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                type = "password"
                value = {newPassword} // Gets value from newPassword state
                onChange = {(e) => setNewPassword(e.target.value)} // Updates newPassword state on input change
                required
                />
            </div>
            <div>
            <label>Confirm New Password:</label>
                <input
                type = "password"
                value = {confirmPassword} // Gets value from confirmPassword state
                onChange = {(e) => setConfirmPassword(e.target.value)} // Updates confirmPassword state on input change
                required
                />
            </div>
            <button type = "submit">Update Password</button> {/* Submits form */}
        </form>
    </div>
  );
}

export default UpdatePasswordPage;