import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PhishingSimulationPage () {
    const [email, setEmail] = useState(""); // State to store the email content
    const [correctType, setCorrectType] = useState(""); // State to store the correct type of email
    const [userChoice, setUserChoice] = useState(null); // State to store the user's choice
    const [feedback, setFeedback] = useState(""); // State to store the feedback message

    // Fetches an email from the API, assigns it to the state, and resets the user's choice and feedback message
    const fetchEmail = async () => {
        setFeedback("");
        setUserChoice(null);
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("/api/gemini/generate-email", { 
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

    // Handles the user's choice and provides feedback
    const handleChoice = (choice) => {
        setUserChoice(choice);
        if (choice === correctType) {
            setFeedback("Correct! You identified the email properly.");
        } else {
            setFeedback(`Incorrect. This was a ${correctType} email.`);
        }
    };

    // Fetches an email when the page is loaded
    useEffect(() => {
        fetchEmail(); 
    }, []);

    return (
        <div>
            <Link to = "/main" className = "back-link">← Back to Dashboard</Link>
            <h1>Phishing or Legitimate?</h1>
            <p>Read the email below and decide for yourself whether it is likely to be a phishing email, or a legitimate one.</p>

            <div>
                <p>{email}</p> {/* Renders the email content */}
            </div>

            <button onClick={() => handleChoice("phishing")}>Phishing</button> {/* Calls handleChoice with "phishing" as the argument */}
            <button onClick={() => handleChoice("legitimate")}>Legitimate</button> {/* Calls handleChoice with "legitimate" as the argument */}

            {feedback && <p>{feedback}</p>} {/* Renders the feedback message if it exists */}

            <button onClick={fetchEmail}>Next Email</button> {/* Calls fetchEmail on button click */}
        </div>
    );
}

export default PhishingSimulationPage;

