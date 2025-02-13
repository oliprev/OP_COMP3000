import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); // State to manage error message

    const navigate = useNavigate(); // Get navigate function from useNavigate hook

    const handleChange = (e) => { // Handle form input changes
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post("http://localhost:9000/api/users/login", formData); // Send POST request to login route
            if (response.status === 200) { // If response status is OK
                localStorage.setItem("token", response.data.token); // Store token in local storage
                localStorage.setItem("userId", response.data.userId); // Store user ID in local storage
                localStorage.setItem("experienceLevel", response.data.experienceLevel); // Store experience level in local storage
                navigate("/main"); // Navigate to main page
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred."); // Set error message
        }
    };

    return (
        <div>
          <Link to="/" className="back-link">← Back</Link>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            />
            <br></br><Link to ="/register">No login? Make an account</Link><br></br>
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
    );
}

export default LoginPage;