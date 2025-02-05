import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MainPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const fetchUserName = async () => {
            if (userId && token) {
                try {
                    const response = await axios.get(`http://localhost:9000/api/users/${userId}/name`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setName(response.data.name);
                    const firstName = response.data.name.split(" ")[0];
                    setFirstName(firstName);
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error("User ID or token not found.");
            }
        };
    
        fetchUserName();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    }
    
    return (
        <div>
            <Link to = "/" onClick={handleLogout} className="back-link">← Log out</Link><br></br>
            <h1>Dashboard</h1>
            {firstName && <h2>Welcome, {firstName}!</h2>}
            <Link to = "/main/modules">Training Modules</Link><br></br>
            <Link to = "/main/gemini">Cybersecurity Chatbot</Link><br></br>
            <Link to = "/main/phishing">Phishing Simulation</Link><br></br>
            <Link to = "/main/profile">Profile</Link><br></br>
        </div>
    );
}

export default MainPage;