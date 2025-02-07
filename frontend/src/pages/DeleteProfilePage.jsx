import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DeleteProfilePage() {
    const navigate = useNavigate();

    // Function to delete profile
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            const response = await axios.delete("http://localhost:9000/api/users/delete", { // Send request to delete route
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
        <div>
            <h1>Delete Profile</h1>
            <button onClick={handleDelete}>Delete Profile</button>
            <Link to="/main/profile">Cancel</Link>
        </div>
    );
}

export default DeleteProfilePage;