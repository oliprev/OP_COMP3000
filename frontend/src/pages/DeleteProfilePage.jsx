import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Typography } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling

function DeleteProfilePage() {
    const navigate = useNavigate();

    // Function to delete profile
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            const response = await axios.delete("/api/users/delete", { // Send request to delete route
                headers: {
                    Authorization: `Bearer ${token}` // Send token in header
                }
            });
            if (response.status === 200) { // If successful .. 
                localStorage.removeItem("token"); // Remove token from local storage
                localStorage.removeItem("userId"); // Remove userId from local storage
                alert(response.data.message); // Alert success message
                navigate("/"); // Navigates to login page
            }
        } catch (error) {
            console.error("Error deleting profile:", error); // Logs error
        }
    };

    return (
        <Container>
            <Typography variant = 'h2' fontWeight = '600' sx = {{ color: theme.palette.text.primary }}>Delete Profile</Typography>
            <Button variant = 'contained' onClick = {handleDelete}>Delete Profile</Button> {/* Calls handleDelete on click */}
            <Link to = "/main/profile">Cancel</Link>
        </Container>
    );
}

export default DeleteProfilePage;