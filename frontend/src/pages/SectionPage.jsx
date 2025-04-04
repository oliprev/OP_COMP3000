import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid2, Paper, Box, Typography } from "@mui/material"
import theme from '../theme'; // Importing the theme for styling

function SectionPage() {
    const { topic, subtopic } = useParams(); // Retrieves the topic and subtopic IDs from the URL
    const [sections, setSections] = useState([]); // State to store fetched sections
    const [loading, setLoading] = useState(true); // State to track loading status
    const [names, setNames] = useState({ // State to store the knowledge area / topic and subtopic names
        topic: "",
        subtopic: ""
    });
    const [progress, setProgress] = useState([]); // State to store progress array
    

    // Fetches the topic and subtopic names from the API
    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await axios.get(`/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}`);
                setNames({
                    topic: response.data.topicName,
                    subtopic: response.data.subtopicName
                });
            } catch (error) {
                console.error('Error fetching topic and subtopic names:', error);
            }
        };
    
        fetchNames();
    }, [topic, subtopic]);

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

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("/api/users/progress", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
                setProgress(res.data);
            } catch (error) {
                console.error("Failed to load progress:", error);
            }
            };
        fetchProgress();
      }, []);

    const isSectionCompleted = (sectionId) =>
        progress.some(p => p.sectionId === sectionId && p.completed);

    if (loading) return <p>Loading...</p>;

    return (
    <div>
        <Link to = {`/main/topics/${topic}/subtopics`} className = "back-link">← Back to Subtopics</Link>
        <Typography variant = "h2" fontWeight = {600} sx = {{ color: theme.palette.text.primary }}>{names.topic}</Typography>
        <Typography variant = "h4" sx = {{ color: theme.palette.text.primary }}>{names.subtopic}</Typography>
        <Typography variant = "h5" sx = {{ color: theme.palette.text.primary }}>Sections</Typography>
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
                                sx = {{
                                    padding: '16px',
                                    textAlign: 'center',
                                    backgroundColor: isSectionCompleted(section._id) ? '#c8facc' : '#f0f0f0',
                                    borderRadius: '10px',
                                    color: '#1e293b'
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
