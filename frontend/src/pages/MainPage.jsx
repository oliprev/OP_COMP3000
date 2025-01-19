import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <Link to = "/" className="back-link">Log out</Link><br></br>
            <h1>Dashboard</h1>
            <Link to = "/main/modules">Training Modules</Link><br></br>
            <Link to = "/main/profile">Profile</Link><br></br>
        </div>
    );
}

export default MainPage;