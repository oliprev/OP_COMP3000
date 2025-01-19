import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to = "/main/modules">Training Modules</Link><br></br>
            <Link to = "/main/profile">Profile</Link><br></br>
            <Link to = "/">Log out</Link><br></br>
        </div>
    );
}

export default MainPage;