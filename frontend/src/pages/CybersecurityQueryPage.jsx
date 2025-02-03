import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CybersecurityQueryPage() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendQuery = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        const newMessages = [...messages, { role: "user", content: query }];
        setMessages(newMessages);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:9000/api/gemini/chatbot", 
                { 
                    prompt: query 
                },{ 
                    headers: { 'Authorization': `Bearer ${token}` } 
                }
            );

            setMessages([...newMessages, { role: "bot", content: response.data.reply }]);
        } catch (err) {
            setError("Error: Unable to fetch response. Please try again.");
        }

        setQuery("");
        setLoading(false);
    };

    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Ask Gemini</h1>
            <h2>Interact with our intuitive chatbot, designed to answer cybersecurity queries.</h2>

            <div>
                {messages.length === 0 ? (
                    <p>No messages yet. Ask a cybersecurity question!</p>
                ) : (
                    messages.map((msg, index) => (
                        <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                            {msg.content}
                        </p>
                    ))
                )}
            </div>

            {error && <p>{error}</p>}

            <div>
                <input
                    type="text"
                    placeholder="Type your cybersecurity query..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                />
                <button onClick={sendQuery} disabled={loading}>
                    {loading ? "Thinking..." : "Ask"}
                </button>
            </div>
        </div>
    );
}

export default CybersecurityQueryPage
