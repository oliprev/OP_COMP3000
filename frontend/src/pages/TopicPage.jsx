import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopicPage = () => {
    const [knowledgeAreas, setKnowledgeAreas] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Learning</h1>
            <div>
                {knowledgeAreas.length > 0 ? (
                    knowledgeAreas.map((knowledgeArea) => (
                        <Link 
                            key={knowledgeArea._id} 
                            to={`/main/topics/${knowledgeArea._id}/subtopics`} 
                        >
                            <h2>{knowledgeArea.name}</h2>
                            <p>{knowledgeArea.description}</p>
                        </Link>
                    ))
                ) : (
                    <p>No knowledge areas available</p>
                )}
            </div>
        </div>
    );
};

export default TopicPage;
