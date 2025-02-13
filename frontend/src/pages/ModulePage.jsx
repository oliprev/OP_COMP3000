import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ModulePage() {
    const [content, setContent] = useState({});
    const topics = ["Encryption", "Decryption", "Hashing", "Salting", "Key Exchange", "Digital Signatures", "Certificates", "Public Key Infrastructure", "Symmetric Key Encryption", "Asymmetric Key Encryption"];
    
    useEffect(() => {
        const experienceLevel = localStorage.getItem("experienceLevel");
        const fetchContent = async (topic) => {
            try {
                const response = await axios.get("http://localhost:9000/api/gemini/generate-content");
                setContent(prevContent => ({ ...prevContent, [topic]: response.data.content }));
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        }
        
        topics.forEach((topic) => {
            fetchContent(topic);
        });
    }, [topics]);
    
    
    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Training Modules</h1><br></br>
            <h2>Interact with our carefully curated learning material.</h2>
            {topics.map(topic => (
                <div key={topic}>
                    <h3>{topic}</h3>
                    {content[topic] ? (
                        <div>
                            <h4>{content[topic].title}</h4>
                            <p>{content[topic].description}</p>
                        </div>
                    ) : (
                        <p>Loading content for {topic}...</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ModulePage;