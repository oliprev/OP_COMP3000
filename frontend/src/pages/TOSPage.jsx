import React from "react";
import { Link } from "react-router-dom";

function TOSPage() {
    return (
        <div>
            <Link to="/register" className="back-link">← Back</Link>
            <h1>SecuLearn - Terms of Service</h1>
            <p>These Terms of Service govern the use of SecuLearn, an application developed for educational purposes by Oliver Prevett, at the University of Plymouth.</p>
            <p>To use the platform, you (the user) must agree to the following terms:</p>
            <ul>    
                <li>SecuLearn is a platform for educational purposes only. It is not to be used for any other purposes.</li>
                <li>You must not attempt to hack the platform, or use it for any illegal activity.</li>
                <li>You must not input any inappropriate queries into the artificial intelligence features.</li>
                <li>You must take full responsibility of allowing SecuLearn to store your credentials.</li>
                <li>SecuLearn is not responsible for any damages incurred through your use of the software.</li>
            </ul>
            <p>Users will be duly notified in advance of any changes to the Terms of Service</p>
            <p>This is a purely academic project, and is not legally binding for commercial use.</p>
        </div>
    );
}

export default TOSPage;