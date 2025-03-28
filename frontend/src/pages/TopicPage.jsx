import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopicPage() {
    const [knowledgeAreas, setKnowledgeAreas] = useState([]); // State to store fetched knowledge areas
    const [loading, setLoading] = useState(true); // State to track loading status

    // Fetches knowledge areas from the API, assigns them to the state, and updates the loading status
    useEffect(() => {
        axios.get('http://localhost:9000/api/cybok/knowledge-areas') 
            .then((response) => {
                setKnowledgeAreas(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Link to = "/main" className = "back-link">← Back to Dashboard</Link> 
            <h1>Topics</h1>
            <div>
                {knowledgeAreas.length > 0 ? ( // Checks that knowledgeAreas array is not empty
                    knowledgeAreas.map((knowledgeArea) => ( // Maps over knowledgeAreas array to render each knowledge area
                        <Link 
                            key = {knowledgeArea._id} // Assigns the knowledge area ID as the key
                            to = {`/main/topics/${knowledgeArea._id}/subtopics`} // Generates the link to the subtopics page for the knowledge area
                        >
                            {/* Renders the knowledge area name and description */}
                            <h2>{knowledgeArea.name}</h2> 
                            <p>{knowledgeArea.description}</p>
                        </Link>
                    ))
                ) : (
                    <p>No knowledge areas available</p> // Renders if knowledgeAreas array is empty
                )}
            </div>
        </div>
    );
};

export default TopicPage;
