import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid2, Paper } from "@mui/material"
import { Button } from '@mui/material';

function SubtopicPage() {
    const { topic } = useParams(); // Retrieves the topic ID from the URL
    const navigate = useNavigate(); // Initialises the navigate function from the useNavigate hook
    const [subtopics, setSubtopics] = useState([]); // State to store fetched subtopics
    const [knowledgeArea, setKnowledgeArea] = useState(null); // State to store the knowledge area name
    const [loading, setLoading] = useState(true); // State to track loading status
    const hasSections = (subtopic) => subtopic?.sections?.length > 0; // Function to check if a subtopic has sections

    // Fetches subtopics for the selected topic from the API, assigns them to the state, and updates the loading status
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
  <div>
    <Link to="/main/topics" className="back-link">← Back to Learning</Link>
    {knowledgeArea && <h1>{knowledgeArea}</h1>}
    <h2>Subtopics</h2>
    {subtopics.length > 0 ? (
      <Grid2 container spacing = {5}>
        {subtopics.map((subtopic) => (
          <Grid2 key = {subtopic._id} size = {{ md: 4 }}>
            <Paper
              elevation = {4}
              onClick = {() => handleSubtopicClick(subtopic)}
              style = {{
                padding: '16px',
                backgroundColor: '#f0f0f0',
                pointer: 'pointer'
              }}
            >
            <h2 style = {{ color: 'black' }}>{subtopic.name}</h2>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    ) : (
      <p>No subtopics available.</p>
    )}
  </div>
);
}

export default SubtopicPage;