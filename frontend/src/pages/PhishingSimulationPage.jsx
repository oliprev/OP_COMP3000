import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling

function PhishingSimulationPage () {
    const [email, setEmail] = useState(""); // State to store the email content
    const [correctType, setCorrectType] = useState(""); // State to store the correct type of email
    const [userChoice, setUserChoice] = useState(null); // State to store the user's choice
    const [feedback, setFeedback] = useState(""); // State to store the feedback message
    const [loading, setLoading] = useState(true); // State to track loading status

    // Fetches an email from the API, assigns it to the state, and resets the user's choice and feedback message
    const fetchEmail = async () => {
        setFeedback("");
        setUserChoice(null);

        try {
            const response = await axios.get("/api/gemini/generate-email");
            setEmail(response.data.email);
            setCorrectType(response.data.type);
            setLoading(false);
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
        <Container sx={{ py: 4 }}>
            <Link to="/main" className="back-link">
                ← Back to Dashboard
            </Link>

            <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
                Phishing or Legitimate?
            </Typography>

            <Typography variant="h6" sx={{ mb: 3 }}>
                Read the email below and decide whether it is likely to be a phishing email or a legitimate one.
            </Typography>

            {/* Styled Paper component with email content */}
            {loading ? (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                    Loading content...
                </Typography>
            ) : email ? (
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "30px",
                        maxWidth: "800px",
                        width: "100%",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography >{email}</Typography>
                </Paper>
            ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                    No email available.
                </Typography>
            )}

            {/* Answer buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 2 }}>
                <Button variant="contained" onClick={() => handleChoice("phishing")}>
                    Phishing
                </Button>
                <Button variant="contained" onClick={() => handleChoice("legitimate")}>
                    Legitimate
                </Button>
            </Box>

            {/* Feedback */}
            {feedback && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {feedback}
                </Typography>
            )}

            <Button variant="outlined" onClick={fetchEmail}>
                New Email
            </Button>
        </Container>
    );
}

export default PhishingSimulationPage;

