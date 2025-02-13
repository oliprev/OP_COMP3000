import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Untitled security application</h1>
            <Link to="/register">Register</Link><br></br> 
            <Link to="/login">Login</Link>
            <footer>
                <p>This application has been developed by Oliver Prevett, for the COMP3000 project.</p>
            </footer>
        </div>
    );
}

export default HomePage;