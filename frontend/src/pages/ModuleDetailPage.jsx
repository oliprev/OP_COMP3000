import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ModuleSubtopicsPage = () => {
    const { topic } = useParams();
    const [subtopics, setSubtopics] = useState([]);
    const [knowledgeArea, setKnowledgeArea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/cybok/knowledge-areas/${topic}/subtopics`)
            .then(response => {
                setSubtopics(response.data.subtopics);
                setKnowledgeArea(response.data.knowledgeArea);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching subtopics:', error);
                setLoading(false);
            });
    }, [topic]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/main/modules" className="back-link">← Back to Modules</Link>
            {knowledgeArea && <h1>{knowledgeArea.name}</h1>}
            <h2>Subtopics</h2>
            <ul>
                {subtopics.length > 0 ? (
                    subtopics.map(subtopic => (
                        <Link key={subtopic._id} to={`/main/modules/${topic}/subtopics/${subtopic._id}`}>
                            <h3>{subtopic.name}</h3>
                        </Link>
                    ))
                ) : (
                    <p>No subtopics available.</p>
                )}
            </ul>
        </div>
    );
};

export default ModuleSubtopicsPage;