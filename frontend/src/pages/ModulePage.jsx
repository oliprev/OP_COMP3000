import React from "react";
import { Link } from "react-router-dom";

function ModulePage() {
    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Training Modules</h1><br></br>
            <h2>Interact with our carefully curated learning material.</h2>
        </div>
    )
}

export default ModulePage;