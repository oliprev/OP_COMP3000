import React from "react";
import { Link } from "react-router-dom";

function TOSPage() {
    return (
        <div>
            <Link to="/register" className="back-link">← Back</Link>
            <h1>SecuLearn - Terms of Service</h1>
            <p>These Terms of Service govern the use of SecuLearn, an application developed for educational purposes by Oliver Prevett at the University of Plymouth.</p>
            <p>To use the platform, you (the user) must agree to the following terms:</p>
            <ol>    
                <li>SecuLearn is a platform intended soley for educational use. It is not to be used for any other purposes.</li>
                <li>You must not attempt to exploit, attack, or compromise the platform through any means.</li>
                <li>You must not input any inappropriate queries into the artificial intelligence features.</li>
                <li>You must take full responsibility of allowing SecuLearn to store your credentials.</li>
                <li>SecuLearn is not responsible for any damages incurred through your use of the software.</li>
                <li>SecuLearn is not responsible for any inappropriate responses from Google Gemini.</li>
            </ol>
            <p>Any future updates to these Terms of Service will be communicated in advance.</p>
            <p>This is a purely academic project, and is not intended for commercial deployment right now. These terms are not legally binding.</p>
            <p><em>Version 1.1 - March 27, 2025 23:47PM</em></p>
        </div>
    );
}

export default TOSPage;