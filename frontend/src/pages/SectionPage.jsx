import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SectionPage = () => {
    const { topic, subtopic } = useParams();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}/sections`)
            .then((response) => {
                setSections(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching sections:', error);
            });
    }, [topic, subtopic]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Sections</h1>
            <div>
                {sections.length > 0 ? (
                    sections.map((section) => (
                        <Link 
                            key={section._id} to={`/main/topics/${topic}/subtopics/${subtopic}/sections/${section._id}`} 
                        >
                            <h2>{section.name}</h2>
                        </Link>
                    ))
                ) : (
                    <p>No sections available</p>
                )}
            </div>
        </div>
    );
};

export default SectionPage;
