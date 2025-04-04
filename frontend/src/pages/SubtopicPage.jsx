import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid2, Paper, Box, Typography, Container } from "@mui/material"
import { Button } from '@mui/material';
import theme from '../theme'; // Importing the theme for styling

function SubtopicPage() {
    const { topic } = useParams(); // Retrieves the topic ID from the URL
    const navigate = useNavigate(); // Initialises the navigate function from the useNavigate hook
    const [subtopics, setSubtopics] = useState([]); // State to store fetched subtopics
    const [knowledgeArea, setKnowledgeArea] = useState(null); // State to store the knowledge area name
    const [loading, setLoading] = useState(true); // State to track loading status
    const hasSections = (subtopic) => subtopic?.sections?.length > 0; // Function to check if a subtopic has sections
    const [progress, setProgress] = useState([]); // State to store progress array

    // Fetches subtopics for the selected topic from the API, assigns them to the state, and updates the loading status
    useEffect(() => {
        const fetchSubtopics = async () => {
            try {
                const response = await axios.get(`/api/cybok/knowledge-areas/${topic}/subtopics`);
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
    
    const isSubtopicCompleted = (subtopic) =>
      subtopic.sections.every(section => isSectionCompleted(section._id));

    // Navigates to the subtopic's sections page if the subtopic has sections, otherwise navigates to the subtopic's learn page
    const handleSubtopicClick = (subtopic) => {
        if (subtopic.hasSections) {
            navigate(`/main/topics/${topic}/subtopics/${subtopic._id}/sections`);
        } else {
            navigate(`/main/topics/${topic}/subtopics/${subtopic._id}/learn`);
        }
    };

    if (loading) return <p>Loading...</p>;

return (
  <Container>
    <Link to="/main/topics" className="back-link">← Back to Learning</Link>
    {knowledgeArea && <Typography variant = 'h2' fontWeight = {600} sx = {{ color: theme.palette.text.primary }}>{knowledgeArea}</Typography>}
    <Typography variant = 'h4' sx = {{ color: theme.palette.text.primary }}>Subtopics</Typography>
    {subtopics.length > 0 ? ( // Checks that subtopics array is not empty
      <Grid2 container spacing = {4} justifyContent = {'center'} marginTop = {'10px'}> {/* Renders subtopics in a grid layout with spacing */}
        {subtopics.map((subtopic) => ( // Maps over subtopics array to render each subtopic
          <Grid2 key = {subtopic._id} size = {{ md: 4 }}> {/* Assigns the subtopic ID as the key */}
            <Box
              onClick={() => handleSubtopicClick(subtopic)} // Generates the click event to navigate to the subtopic's sections or learn page
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
                  backgroundColor: isSubtopicCompleted(subtopic) ? '#c8facc' : '#f0f0f0',
                  borderRadius: '10px',
                  color: '#1e293b'
                }}
              >
              <Typography variant = 'h6' fontWeight = {550}>{subtopic.name}</Typography> {/* Renders the subtopic name */}
              </Paper>
            </Box>
          </Grid2>
          ))}
        </Grid2>
    ) : (
        <p>No subtopics available.</p> // Renders if subtopics array is empty
    )}
  </Container>
);
}

export default SubtopicPage;