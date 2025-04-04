import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid2, Card, CardActionArea, Typography } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling
import SchoolIcon from '@mui/icons-material/School';
import "@fontsource/inter";

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
                    const response = await axios.get(`/api/users/${userId}/name`, {
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
        localStorage.removeItem("experienceLevel");
        navigate("/");
    }
    
    return (
        <Container>
            <Link to = "/" onClick={handleLogout} className = "back-link">← Log out</Link><br></br>
            <Typography variant = 'h1' fontWeight = '650' sx = {{ color: theme.palette.text.primary, fontFamily: "Inter, sans-serif" }}>Secu<SchoolIcon sx = {{ fontSize: 40 }}/>Learn </Typography>
            <Typography variant = "h3" margin = {5} sx = {{ color: theme.palette.text.primary }}>Dashboard</Typography>
            {firstName && <Typography variant = "h4" margin = {5} sx = {{ color: theme.palette.text.primary }}>Welcome, {firstName}!</Typography>} {/* Renders the user's first name */}
            <Grid2 container spacing = {4}>
                {[
                    { label: "Learning", path: "/main/topics" },
                    { label: "Cybersecurity Chatbot", path: "/main/gemini" },
                    { label: "Phishing Simulation", path: "/main/phishing" },
                    { label: "Profile", path: "/main/profile" },
                ].map((item) => (
                    <Grid2 item md= {3} key = {item.label}>
                        <Card>
                            <CardActionArea component = {Link} to = {item.path} sx = {{ padding: 4, backgroundColor: "#f0f0f0", borderRadius: '10px'}}>
                                <Typography variant = "h6" fontWeight = {600} sx = {{ color: '#1e293b' }}>{item.label}</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}

export default MainPage;