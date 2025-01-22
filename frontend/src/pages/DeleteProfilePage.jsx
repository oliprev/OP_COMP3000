import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DeleteProfilePage() {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete("http://localhost:9000/api/users/delete", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                alert(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
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