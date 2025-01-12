import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>COMP3000</h1>
            <Link to="/login">Login</Link><br></br>
            <Link to="/register">Register</Link>
        </div>
    );
}

export default HomePage;