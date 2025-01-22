import React from "react";
import { Link } from "react-router-dom";

function CybersecurityQueryPage() {
    return (
        <div>
            <Link to="/main" className="back-link">Back to Dashboard</Link>
            <h1>Ask Gemini</h1><br></br>
            <h2>Input any queries you have below - such as whether an email is likely to be phishing, and more.</h2>
        </div>
    )
}

export default CybersecurityQueryPage;