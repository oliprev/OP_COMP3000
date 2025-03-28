import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid2, Paper, Box } from "@mui/material"

function TopicPage() {
    const [knowledgeAreas, setKnowledgeAreas] = useState([]); // State to store fetched knowledge areas
    const [loading, setLoading] = useState(true); // State to track loading status

    // Fetches knowledge areas from the API, assigns them to the state, and updates the loading status
    useEffect(() => {
        axios.get('http://localhost:9000/api/cybok/knowledge-areas') 
            .then((response) => {
                setKnowledgeAreas(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container>
          <Link to = "/main" className = "back-link">← Back to Dashboard</Link>
          <h1>Topics</h1>
          {knowledgeAreas.length > 0 ? (
            <Grid2 container spacing = {4}>
              {knowledgeAreas.map((knowledgeArea) => (
                <Grid2 key = {knowledgeArea._id} size = {{ md: 4 }} sx = {{ backgroundColor: 'transparent' }}>
                  <Box
                    component = {Link}
                    to = {`/main/topics/${knowledgeArea._id}/subtopics`} // Generates the link to the subtopics page
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
                      <h2 style = {{ color: 'black', marginBottom: '8px' }}>
                        {knowledgeArea.name} {/* Renders the knowledge area name */}
                      </h2>
                      <p style = {{ color: 'black' }}>{knowledgeArea.description}</p> {/* Renders the knowledge area description */}
                    </Paper>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <p>No knowledge areas available</p> // Renders if knowledge areas array is empty
          )}
        </Container>
      );
};

export default TopicPage;
