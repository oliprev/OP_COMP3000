import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Untitled Cybersecurity Platform</h1>
            <Link to="/register">Register</Link><br></br>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default HomePage;