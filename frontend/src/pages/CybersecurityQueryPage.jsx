import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";

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
            const token = localStorage.getItem("token"); // Gets token from local storage
            const response = await axios.post("/api/gemini/chatbot", // Sends request to chatbot route
                { 
                    prompt: query // Sends query as prompt
                },{ 
                    headers: { 'Authorization': `Bearer ${token}` } // Sends token in header
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
        <div>
            <Link to = "/main" className = "back-link">← Back to Dashboard</Link>
            <h1>Ask Gemini</h1>
            <h2>Interact with our intuitive chatbot, designed to answer cybersecurity queries.</h2>

            <div>
                {messages.length === 0 ? ( // If no messages, render message
                    <p>No messages yet. Ask a cybersecurity question!</p>
                ) : (
                    messages.map((msg, index) => ( // Maps over messages array to render each message
                        // Assigns the message index as the key and sets the text alignment based on the role
                        <p key = {index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}> 
                            {msg.content}
                        </p>
                    ))
                )}
            </div>

            {error && <p>{error}</p>} {/* Renders error message if error state is not null */}

            <div>
                <TextField
                    type = "text"
                    placeholder = "Type your cybersecurity query..."
                    value = {query} // Sets query value
                    className = "chat-input"
                    onChange = {(e) => setQuery(e.target.value)} // Updates query state on change
                    disabled = {loading} // Disables input field if loading
                />
                <Button onClick = {sendQuery} disabled = {loading}> {/* Calls sendQuery function on click */}
                    {loading ? "Thinking..." : "Ask"} {/* Renders "Thinking..." if loading, otherwise "Ask" */}
                </Button>
            </div>
        </div>
    );
}

export default CybersecurityQueryPage
