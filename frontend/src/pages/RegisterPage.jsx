import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const [formData, setFormData] = useState({ // Initialise state for form data with empty strings
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        experienceLevel: "Beginner",
        tosAccepted: false,
        privacyPolicyAccepted: false
    });
    const navigate = useNavigate(); // Get navigate function from useNavigate hook

    const handleChange = (e) => { // Handle form input changes
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission
        console.log("Form Data:", formData); // Log form data
        if (formData.tosAccepted && formData.privacyPolicyAccepted) {
            try {
                const response = await axios.post(`/api/users/register`, formData); // Send POST request to register route
                console.log("Response:", response); // Log response
                navigate("/login"); // Navigate to login page
            } catch (error) {
                console.error("Error:", error); // Log error
            }
        } else {
            alert('Please accept the terms of service and privacy policy.');
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
            /><br></br>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            /><br></br>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            /><br></br>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
            /><br></br>
            <br></br><label>Select what you believe your cybersecurity skill level is: </label>
            <select
              name="experienceLevel" 
              value={formData.experienceLevel} // Gets value
              onChange={handleChange}>  
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select><br></br>
            <input 
              type="checkbox"
              name="tosAccepted"
              id="tos"
              checked={formData.tosAccepted} // Gets value
              onChange={handleChange} // Call handleChange function on input change
            /><label htmlFor="tos"> Accept <Link to="/tos" className="link-inline">Terms of Service</Link></label><br></br> {/* Generates link to terms of service page */}
            <input
              type="checkbox"
              name="privacyPolicyAccepted"
              id="privacyPolicy"
              checked={formData.privacyPolicyAccepted} // Gets value
              onChange={handleChange} // Call handleChange function on input change
            /><label htmlFor="privacyPolicy"> Acknowledge <Link to="/privacy" className="link-inline">Privacy Policy</Link></label><br></br> {/* Generates link to privacy policy page */}
            <br></br>
            <button type="submit">Register</button>
          </form>
          <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default RegisterPage;