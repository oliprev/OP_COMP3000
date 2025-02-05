import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PhishingSimulationPage () {
    const [email, setEmail] = useState("");
    const [correctType, setCorrectType] = useState("");
    const [userChoice, setUserChoice] = useState(null);
    const [feedback, setFeedback] = useState("");

    const fetchEmail = async () => {
        setFeedback("");
        setUserChoice(null);
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("http://localhost:9000/api/gemini/generate-email", { 
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
            });
            setEmail(response.data.email);
            setCorrectType(response.data.type);
        } catch (error) {
            setEmail("Error loading email. Try again.");
        }
    };

    const handleChoice = (choice) => {
        setUserChoice(choice);
        if (choice === correctType) {
            setFeedback("Correct! You identified the email properly.");
        } else {
            setFeedback(`Incorrect. This was a ${correctType} email.`);
        }
    };

    useEffect(() => {
        fetchEmail(); 
    }, []);

    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Phishing or Legitimate?</h1>
            <p>Read the email below and decide for yourself whether it is likely to be a phishing email, or a legitimate one.</p>

            <div>
                <p>{email}</p>
            </div>

            <button onClick={() => handleChoice("phishing")}>Phishing</button>
            <button onClick={() => handleChoice("legitimate")}>Legitimate</button>

            {feedback && <p>{feedback}</p>}

            <button onClick={fetchEmail}>Next Email</button>
        </div>
    );
}

export default PhishingSimulationPage;

