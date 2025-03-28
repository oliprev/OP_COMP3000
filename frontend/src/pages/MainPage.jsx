import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MainPage() {
    const navigate = useNavigate(); // Initialises the navigate function from the useNavigate hook
    const [name, setName] = useState(""); // State to store the user's name
    const [firstName, setFirstName] = useState(""); // State to store the user's first name

    // Fetches the user's name from the API, based on their userId in localStorage, and assigns it to the state
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const fetchUserName = async () => {
            if (userId && token) {
                try {
                    const response = await axios.get(`http://localhost:9000/api/users/${userId}/name`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Passes the token in the request header
                        },
                    });
                    setName(response.data.name);
                    const firstName = response.data.name.split(" ")[0]; // Extracts the first name from the full name
                    setFirstName(firstName);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error("User ID or token not found.");
            }
        };
    
        fetchUserName();
    }, []);

    // Removes the token and userId from localStorage and navigates to the login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    }
    
    return (
        <div>
            <Link to = "/" onClick={handleLogout} className = "back-link">← Log out</Link><br></br>
            <h1>SecuLearn</h1>
            <h2>Dashboard</h2>
            {firstName && <h3>Welcome, {firstName}!</h3>} {/* Renders the user's first name */}
            <Link to = "/main/topics">Learning</Link><br></br> {/* Generates the link to the topics page */}
            <Link to = "/main/gemini">Cybersecurity Chatbot</Link><br></br> {/* Generates the link to the chatbot page */}
            <Link to = "/main/phishing">Phishing Simulation</Link><br></br> {/* Generates the link to the phishing simulation page */}
            <Link to = "/main/profile">Profile</Link><br></br> {/* Generates the link to the profile page */}
        </div>
    );
}

export default MainPage;