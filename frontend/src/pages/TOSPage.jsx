import React from "react";
import { Link } from "react-router-dom";

function TOSPage() {
    return (
        <div>
            <Link to="/register" className="back-link">← Back</Link>
            <h1>SecuLearn - Terms of Service</h1>
            <p>These Terms of Service govern the use of SecuLearn, an application developed for educational purposes by Oliver Prevett, at the University of Plymouth.</p>
            <p>By using the software, you must agree to the following terms:</p>
            <li>
                <p>1</p>
                <p>2</p>
            </li>
        </div>
    );
}

export default TOSPage;