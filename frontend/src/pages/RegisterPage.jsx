import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const [formData, setFormData] = useState({ // Initialise state for form data with empty strings
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        experienceLevel: ""
    });
    const navigate = useNavigate(); // Get navigate function from useNavigate hook

    const handleChange = (e) => { // Handle form input changes
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Form Data:", formData); // Log form data
        try {
            const response = await axios.post("http://localhost:9000/api/users/register", formData); // Send POST request to register route
            console.log("Response:", response); // Log response
            navigate("/login"); // Navigate to login page
        } catch (error) {
            console.error("Error:", error); // Log error
        }
    };

    return (
        <div>
          <Link to="/" className="back-link">← Back</Link>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            />
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
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            />
            <br></br><label>Select what you believe your cybersecurity skill level is:</label>
            <select
              name="experienceLevel" 
              value={formData.experienceLevel} // Gets value
              onChange={handleChange}>  
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select><br></br>
            <button type="submit">Register</button>
          </form>
          <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default RegisterPage;