import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // Log form data
        try {
            const response = await axios.post("http://localhost:9000/api/users/register", formData);
            console.log("Response:", response); // Log response
            navigate("/login");
        } catch (error) {
            console.error("Error:", error); // Log error
        }
    };

    return (
        <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </form>
          <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default RegisterPage;