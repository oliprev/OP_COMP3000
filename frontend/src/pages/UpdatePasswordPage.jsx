import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdatePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await axios.put('http://localhost:9000/api/users/updatepassword', {
        currentPassword,
        newPassword
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
        <Link to="/main/profile" className="back-link">← Back to Profile</Link>
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Current Password:</label>
                <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
            </div>
            <div>
            <label>Confirm New Password:</label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Update Password</button>
        </form>
    </div>
  );
}

export default UpdatePasswordPage;