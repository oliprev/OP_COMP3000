import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import theme from "../theme"; // Importing the theme for styling

function CybersecurityQueryPage() {
    const [query, setQuery] = useState(""); // Query state
    const [messages, setMessages] = useState([]); // Message state
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to send query
    const sendQuery = async () => {
        if (!query.trim()) return; // If query is empty, return
        setLoading(true); // Set loading to true
        setError(null); // Resets error

        const newMessages = [...messages, { role: "user", content: query }]; // Adds user message to message array
        setMessages(newMessages); // Sets messages

        try {
            const response = await axios.post("/api/gemini/chatbot", // Sends request to chatbot route
                { 
                    prompt: query // Sends query as prompt
                }
            );

            setMessages([...newMessages, { role: "bot", content: response.data.reply }]); // Adds bot reply message to message array
        } catch (err) {
            setError("Error: Unable to fetch response. Please try again."); // Sets error message - usually if query is not relevant
        }

        setQuery(""); // Resets query
        setLoading(false); // Sets loading to false
    };

    return (
        <Container>
            <Link to = "/main" className = "back-link">← Back to Dashboard</Link>
            <Typography variant = 'h3' sx = {{ color: theme.palette.text.primary }}>SecuLearn Chatbot</Typography>
            <Typography variant = 'body1' sx = {{ color: theme.palette.text.primary }}>Interact with our intuitive chatbot, designed to answer cybersecurity queries. You can also paste in content - e.g. seemingly malicious emails of which can be analysed.</Typography>

            <Container sx = {{ marginTop: '40px', padding: '10px' }}>
                {messages.length === 0 ? ( // If no messages, render message
                    <Typography variant = 'body2' sx = {{ color: theme.palette.text.primary }}>No messages yet. Ask a question!</Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                my: 1,
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    maxWidth: "75%",
                                    backgroundColor: msg.role === "user" ? "#0284c7" : theme.palette.background.paper,
                                    color: msg.role === "user" ? "#ffffff" : theme.palette.text.primary,
                                    borderRadius: 2,
                                    wordBreak: "break-word",
                                }}
                            >
                                <Typography variant="body2">{msg.content}</Typography>
                            </Paper>
                        </Box>
                    ))
                )}
            </Container>

            {error && <p>{error}</p>} {/* Renders error message if error state is not null */}

            <Container>
                <TextField
                    type = "text"
                    placeholder = "Type your cybersecurity query..."
                    value = {query} // Sets query value
                    className = "chat-input"
                    onChange = {(e) => setQuery(e.target.value)} // Updates query state on change
                    disabled = {loading} // Disables input field if loading
                />
                <Button variant = 'contained' onClick = {sendQuery} disabled = {loading}> {/* Calls sendQuery function on click */}
                    {loading ? "Thinking..." : "Ask"} {/* Renders "Thinking..." if loading, otherwise "Ask" */}
                </Button>
            </Container>
        </Container>
    );
}

export default CybersecurityQueryPage
