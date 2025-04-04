import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]); // State to manage error message

    const navigate = useNavigate(); // Get navigate function from useNavigate hook

    const handleChange = (e) => { // Handle form input changes
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrors([]); // Reset errors state
        try {
            const response = await axios.post("/api/users/login", formData); // Send POST request to login route
            if (response.status === 200) { // If response status is OK
                localStorage.setItem("token", response.data.token); // Store token in local storage
                localStorage.setItem("userId", response.data.userId); // Store user ID in local storage
                localStorage.setItem("experienceLevel", response.data.experienceLevel); // Store experience level in local storage
                navigate("/main"); // Navigate to main page
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
              const errors = error.response.data.errors.map(err => err.msg); // Map through errors caught by validation and gets the error messages
              setErrors(errors); // Sets error messages to state
            }
            
        }
    };

    return (
        <Container>
          <Link to="/" className="back-link">← Back</Link>
          <Typography variant = 'h2' fontWeight = {600} marginBottom = '30px' sx = {{ color: theme.palette.text.primary }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              type="email"
              name="email"
              label="Email"
              value={formData.email} // Gets value from formData
              onChange={handleChange} // Call handleChange function on input change
              slotProps={{
                input: {
                  sx: { color: theme.palette.text.primary }
              }}}
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
              slotProps={{
                input: {
                  sx: { color: theme.palette.text.primary }
              }}}
              fullWidth
              margin="normal"
            />
            <br></br><Link to ="/register" sx = {{ color: theme.palette.text.primary }}>No login? Make an account</Link><br></br>
            <Button variant = 'contained' type="submit" sx = {{ backgroundColor: 'black', borderRadius: '10px', color: 'white', variant: 'h4' }}>Login</Button>
          </form>
          {errors.length > 0 && (
            <div>
                {errors.map((msg, index) => (
                    <Typography key = {index} style = {{color: 'red'}}>{msg}</Typography>
                ))}
            </div>
          )}
        </Container>
    );
}

export default LoginPage;