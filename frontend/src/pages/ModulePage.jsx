import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ModulePage = () => {
    const [knowledgeAreas, setKnowledgeAreas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/cybok/knowledge-areas') 
            .then((response) => {
                setKnowledgeAreas(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Training Modules</h1>
            <div className="knowledge-area-list">
                {knowledgeAreas.length > 0 ? (
                    knowledgeAreas.map((knowledgeArea) => (
                        <div key={knowledgeArea._id} className="knowledge-area-card">
                            <h2>{knowledgeArea.name}</h2>
                            <p>{knowledgeArea.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No knowledge areas available</p>
                )}
            </div>
        </div>
    );
};

export default ModulePage;
