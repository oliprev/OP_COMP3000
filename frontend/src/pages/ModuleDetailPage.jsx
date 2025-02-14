import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TopicDetailPage() {
    const { topic } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const experienceLevel = localStorage.getItem("experienceLevel");
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/gemini/generate-content?topic=${topic}&experienceLevel=${experienceLevel}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setContent(response.data.content);
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        fetchContent();
    }, [topic]);

    return (
        <div>
            <Link to="/main/modules" className="back-link">← Back to Modules</Link>
            {content ? (
                <div>
                    <h1>{content.title}</h1>
                    <p>{content.description}</p>
                </div>
            ) : (
                <p>Loading content for {topic}...</p>
            )}
        </div>
    );
}

export default TopicDetailPage;