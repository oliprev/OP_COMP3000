import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SubtopicPage = () => {
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
            <Link to="/main/topics" className="back-link">← Back to Learning</Link>
            {knowledgeArea && <h1>{knowledgeArea.name}</h1>}
            <h1>{knowledgeArea}</h1>           
            <h2>Subtopics</h2>
            <ul>
                {subtopics.length > 0 ? (
                    subtopics.map(subtopic => (
                        <Link key={subtopic._id} to={`/main/topics/${topic}/subtopics/${subtopic._id}`}>
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

export default SubtopicPage;