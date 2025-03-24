import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
    return (
        <div>
            <Link to="/register" className="back-link">← Back</Link>
            <h1>SecuLearn - Privacy Policy</h1>
        </div>
    );
}

export default PrivacyPolicyPage;