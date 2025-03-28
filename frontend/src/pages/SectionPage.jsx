import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function SectionPage() {
    const { topic, subtopic } = useParams(); // Retrieves the topic and subtopic IDs from the URL
    const [sections, setSections] = useState([]); // State to store fetched sections
    const [loading, setLoading] = useState(true); // State to track loading status

    // Fetches sections for the selected topic and subtopic from the API, assigns them to the state, and updates the loading status
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
            <Link to = {`/main/topics/${topic}/subtopics`} className = "back-link">← Back to Subtopics</Link>
            <h1>Sections</h1>
            <div>
                {sections.length > 0 ? ( // Checks that sections array is not empty
                    sections.map((section) => ( // Maps over sections array to render each section
                        <Link 
                            key={section._id} to={`/main/topics/${topic}/subtopics/${subtopic}/sections/${section._id}/learn`} // Generates the link to the learning page for the section
                        >
                            <h2>{section.name}</h2> {/* Renders the section name */}
                        </Link>
                    ))
                ) : (
                    <p>No sections available</p> // Renders if sections array is empty
                )}
            </div>
        </div>
    );
};

export default SectionPage;
