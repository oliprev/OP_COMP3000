import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <Link to = "/main/profile">Profile</Link><br></br>
            <Link to = "/">Log out</Link><br></br>
        </div>
    );
}

export default MainPage;