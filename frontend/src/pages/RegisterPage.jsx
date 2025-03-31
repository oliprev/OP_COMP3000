import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";

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
    const [errors, setErrors] = useState([]); // Initialise state for errors

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
        setErrors([]); // Resets errors state
        if (formData.tosAccepted && formData.privacyPolicyAccepted) {
            try {
                const response = await axios.post(`/api/users/register`, formData); // Send POST request to register route
                navigate("/login"); // Navigate to login page
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    const errors = error.response.data.errors.map(err => err.msg); // Map through errors caught by validation and gets the error messages
                    setErrors(errors); // Sets error messages to state
                }
            }
        } else {
            alert('Please accept the terms of service and privacy policy.');
        }
    };

    return (
        <div>
          <Link to="/" className="back-link">← Back</Link>
          <Typography variant = 'h2' fontWeight = {600} marginBottom = '30px'>Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              type="text"
              name="name"
              label="Full Name"
              value={formData.name} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="email"
              name="email"
              label="Email"
              value={formData.email} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="password"
              name="password"
              label="Password"
              value={formData.password} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
              label="Date of Birth"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
              margin="normal"
            />
            <label>Select what you believe your cybersecurity skill level is: </label>
            <select
              name="experienceLevel" 
              value={formData.experienceLevel} // Gets value
              onChange={handleChange}>  
              <option value="Beginner">Beginner (no / limited experience)</option>
              <option value="Intermediate">Intermediate (good level of experience)</option>
              <option value="Advanced">Advanced (profound experience)</option>
            </select><br></br>
            <input 
              type="checkbox"
              name="tosAccepted"
              id="tos"
              checked={formData.tosAccepted} // Gets value
              onChange={handleChange} // Call handleChange function on input change
            /><label htmlFor="tos" fullWidth margin="normal"> Accept <Link to="/tos" className="link-inline">Terms of Service</Link></label><br></br> {/* Generates link to terms of service page */}
            <input
              type="checkbox"
              name="privacyPolicyAccepted"
              id="privacyPolicy"
              checked={formData.privacyPolicyAccepted} // Gets value
              onChange={handleChange} // Call handleChange function on input change
            /><label htmlFor="privacyPolicy" fullWidth 
            margin="normal"> Acknowledge <Link to="/privacy" className="link-inline">Privacy Policy</Link></label><br></br>{/* Generates link to privacy policy page */}
            <Button type="submit" sx = {{ backgroundColor: 'black', borderRadius: '10px', color: 'white', variant: 'h4' }}>Register</Button>
          </form>
          <Link to="/login">Already have an account? Login</Link>
          {errors.length > 0 && (
          <div>
            <ul>
              {errors.map((msg, index) => (
              <Typography key = {index} style = {{color:'red'}}>{msg}</Typography>
              ))}
            </ul>
          </div>
          )}
        </div>
        
    );
}

export default RegisterPage;