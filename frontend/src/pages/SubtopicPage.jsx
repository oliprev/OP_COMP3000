import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubtopicPage() {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [subtopics, setSubtopics] = useState([]);
    const [knowledgeArea, setKnowledgeArea] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasSections = (subtopic) => subtopic?.sections?.length > 0;

    useEffect(() => {
        const fetchSubtopics = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/cybok/knowledge-areas/${topic}/subtopics`);
                const fetchedSubtopics = response.data.subtopics.map(subtopic => ({
                    ...subtopic,
                    hasSections: hasSections(subtopic)
                }));
                setSubtopics(fetchedSubtopics);
                setKnowledgeArea(response.data.knowledgeArea);
            } catch (error) {
                console.error('Error fetching subtopics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubtopics();
    }, [topic]);

    const handleSubtopicClick = (subtopic) => {
        if (subtopic.hasSections) {
            navigate(`/main/topics/${topic}/subtopics/${subtopic._id}/sections`);
        } else {
            navigate(`/main/topics/${topic}/subtopics/${subtopic._id}/learn`);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/main/topics" className="back-link">← Back to Learning</Link>
            {knowledgeArea && <h1>{knowledgeArea}</h1>}

            <h2>Subtopics</h2>
            <ul>
                {subtopics.length > 0 ? (
                    subtopics.map(subtopic => (
                        <button key={subtopic._id} onClick={() => handleSubtopicClick(subtopic)}>
                            {subtopic.name}
                        </button>
                    ))
                ) : (
                    <p>No subtopics available.</p>
                )}
            </ul>
        </div>
    );
}

export default SubtopicPage;