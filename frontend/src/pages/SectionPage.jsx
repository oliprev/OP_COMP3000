import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid2, Paper, Box, Typography } from "@mui/material"

function SectionPage() {
    const { topic, subtopic } = useParams(); // Retrieves the topic and subtopic IDs from the URL
    const [sections, setSections] = useState([]); // State to store fetched sections
    const [loading, setLoading] = useState(true); // State to track loading status

    // Fetches sections for the selected topic and subtopic from the API, assigns them to the state, and updates the loading status
    useEffect(() => {
        axios.get(`/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}/sections`)
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
        <Typography variant = 'h2' fontWeight = {600}>Sections</Typography>
        {sections.length > 0 ? ( // Checks that sections array is not empty
            <Grid2 container spacing = {4}> {/* Renders sections in a grid layout with spacing */}
                {sections.map((section) => ( // Maps over sections array to render each section
                    <Grid2 key = {section._id} size = {{ md: 4 }} justifyContent={'center'}> {/* Assigns the section ID as the key */}
                        <Box
                            component = {Link}
                            to = {`/main/topics/${topic}/subtopics/${subtopic}/sections/${section._id}/learn`} // Generates the link to the section's learning page
                            style = {{
                                cursor: 'pointer',
                                display: 'block'
                            }}
                        >
                            <Paper
                                elevation = {4} // Adds a shadow effect to the paper
                                style = {{
                                    padding: '16px',
                                    textAlign: 'center',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '10px',
                                }}
                            >
                            <Typography variant = 'h6' fontWeight = {550}>{section.name}</Typography> {/* Renders the section name */}
                            </Paper>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        ) : (
            <p>No sections available</p> // Renders if sections array is empty
        )}
    </div>
);
};

export default SectionPage;
