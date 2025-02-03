import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    }
    
    return (
        <div>
            <Link to = "/" onClick={handleLogout} className="back-link">Log out</Link><br></br>
            <h1>Dashboard</h1>
            <Link to = "/main/modules">Training Modules</Link><br></br>
            <Link to = "/main/gemini">Cybersecurity Chatbot</Link><br></br>
            <Link to = "/main/profile">Profile</Link><br></br>
        </div>
    );
}

export default MainPage;