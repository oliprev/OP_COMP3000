import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, LinearProgress, Button, Container, Box } from "@mui/material";
import theme from "../theme"; // Imports the theme for styling

function LearningPage() {
    const { topic, subtopic, section } = useParams(); // Retrieves the topic, subtopic, and section IDs from the URL
    const [content, setContent] = useState(null); // State to store fetched learning content
    const [loading, setLoading ] = useState(true); // State to track loading status
    const [quiz, setQuiz] = useState(null); // State to store fetched quiz
    const [showQuiz, setShowQuiz] = useState(false); // State to track quiz visibility
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to store selected quiz answer
    const [isCorrect, setIsCorrect] = useState(null); // State to track quiz answer correctness
    const [step, setStep] = useState(1); // State to track learning step - informs backend on which content to fetch
    const navigate = useNavigate(); // Hook to programmatically navigate
    
    // State to store the topic, subtopic, and section names
    const [names, setNames] = useState({
        topic: "",
        subtopic: "",
        section: null
    });
    
    // Object to map step numbers to step types
    const stepList = {
        1: "introduction",
        2: "core-concept-1",
        3: "core-concept-2",
        4: "example",
        5: "summary"
    };
    
    // Object to map step numbers to step names
    const stepNames = {
        "1": "Introduction",
        "2": "First Core Concept",
        "3": "Second Core Concept",
        "4": "Example",
        "5": "Summary"
    };

    // Fetches the topic, subtopic, and section (if applicable) names from the API
    useEffect(() => {
        const fetchNames = async () => {
            try {
                const endpoint = section
                    ? `/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}/sections/${section}`
                    : `/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}`;
    
                const response = await axios.get(endpoint);
                setNames({
                    topic: response.data.topicName,
                    subtopic: response.data.subtopicName,
                    section: response.data.sectionName || null
                });
            } catch (error) {
                console.error('Error fetching names:', error);
            }
        };
    
        fetchNames();
    }, [topic, subtopic, section]);

    // Fetches learning content for the selected topic, subtopic, and section (if applicable) from the API
    const fetchLearningContent = async (stepType) => {
        if (!names.topic || !names.subtopic) return;
    
        const experienceLevel = localStorage.getItem('experienceLevel') || "beginner";
        setLoading(true)

        try {
            const response = await axios.get('/api/gemini/generate-content', {
                params: {
                    topic: names.topic,
                    subtopic: names.subtopic,
                    section: names.section, 
                    step: stepType,
                    experienceLevel
                }
            });
            setContent(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching content:", error);
        } 
    };
    
    // Fetches learning content based on step number, topic, subtopic, and section (if applicable) names
    useEffect(() => {
        const stepType = stepList[step];
        if (stepType && names.topic && names.subtopic) {
            fetchLearningContent(stepType);
        }
    }, [step, names]);

    // Fetches quiz questions for the selected topic, subtopic, and section (if applicable)
    const fetchQuiz = async () => {
        if (!names.topic || !names.subtopic) return;
    
        const experienceLevel = localStorage.getItem('experienceLevel') || "beginner";
    
        try {
            const response = await axios.get('/api/gemini/generate-quiz', {
                params: {
                    topic: names.topic,
                    subtopic: names.subtopic,
                    section: names.section,
                    experienceLevel,
                }
            });
    
            setQuiz(response.data); // Assigns the fetched quiz to the state
            setShowQuiz(true); // Sets the showQuiz state to true
            setSelectedAnswer(null); // Resets the selected answer
            setIsCorrect(null); // Resets the correctness state
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    const handleFinish = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieves the token from local storage
            await axios.post('/api/users/progress/complete', {
                    topicId: topic,
                    subtopicId: subtopic,
                    sectionId: section,
                    completed: true
                }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Section marked as complete!");
            navigate(`/main/topics/${topic}/subtopics/${subtopic}/sections`); // Navigates to the sections page
        } catch (error) {
            console.error("Error marking section complete:", error);
            navigate(`/main/topics/${topic}/subtopics/${subtopic}/sections`); // Navigates to the sectionss page
        }
    };

    return (
        <Container>
            <Link to = {`/main/topics/${topic}/subtopics/${subtopic}/sections`} className = "back-link">← Back to Sections</Link>
            {/* Renders the topic, subtopic, and section names */}
            <Container> 
                <Typography variant = 'h2' fontWeight={400} style ={{ color: theme.palette.text.primary }}>{names.topic}</Typography>
                <Typography variant = 'h4' sx ={{ color: theme.palette.text.primary }}>{names.subtopic}</Typography>
                <Typography variant = 'h5' sx ={{ color: theme.palette.text.primary, mb: '50px' }}>{names.section}</Typography>
            </Container>
            {/* Renders the learning content or quiz based on the showQuiz state */}
            {!showQuiz && (
                <Container>
                    {loading ? (
                        <Typography variant = 'body1' sx = {{ color: theme.palette.text.primary }}>Loading content...</Typography>
                    ) : content ? (
                    <Container>
                        <Typography variant = 'h6' sx ={{ color: theme.palette.text.primary }}>{stepNames[step]}</Typography>
                        <Paper elevation={4} sx = {{ borderRadius: '10px', padding: '10px', marginBottom: '10px', maxWidth: '800px', width: '100%', margin: '0 auto'}}>{content.content}</Paper> {/* Renders the learning content inside a Paper component */}
                    </Container>
                    ) : (
                        <Typography variant = 'body1' sx = {{ color: theme.palette.text.primary }}>No content available.</Typography>
                    )}
                </Container>
            )}
            {/* Renders the quiz if showQuiz is true */}
            {quiz && showQuiz && (
                <Container>
                    <Typography variant = 'h5' sx = {{ color: theme.palette.text.primary }}>Quiz</Typography>
                    <Typography variant = 'h6' sx = {{ color: theme.palette.text.primary }}><strong>{quiz.question}</strong></Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {quiz.options.map((option, index) => (
                        <Box component="li" key={index} sx={{ mb: 1 }}>
                            <Button
                                variant='contained'
                                onClick={() => {
                                setSelectedAnswer(option);
                                setIsCorrect(option.trim().toLowerCase() === quiz.correctAnswer.text.trim().toLowerCase());
                                }}
                                disabled={selectedAnswer !== null}
                                >
                                {option}
                            </Button>
                        </Box>
                        ))}
                    </Box>
                    {selectedAnswer && (
                        <p>Your answer: {selectedAnswer}</p>
                    )}
                    {isCorrect !== null && (
                        <p>{isCorrect ? "Correct!" : `Incorrect. The correct answer was ${quiz.correctAnswer.label}.`}</p> // Renders feedback based on the correctness state
                    )}
                    <Button variant = 'contained' onClick={() => setShowQuiz(false)}>
                        Finish Quiz
                    </Button>
                </Container>
            )}
            <Container>
                <Typography variant="body2" sx = {{ mt: 2, color: theme.palette.text.primary }}>Progress</Typography>
                    <LinearProgress 
                    variant="determinate" 
                    value={(step / Object.keys(stepList).length) * 100} 
                    sx={{ height: 10, borderRadius: 5, mb: 1 }} 
                />   
                 <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                    {/* Decrements the step state, and disables if step state cannot decrement */}
                    <Button variant = 'contained' onClick={() => setStep(prev => Math.max(prev - 1, 1))} disabled = {step === 1 || showQuiz} > 
                        Back
                    </Button>
                    {/* Increments the step state, and disables if step state cannot increment */}
                    {step < Object.keys(stepList).length ? (
                        <Button 
                            variant = 'contained' onClick={() => setStep(prev => Math.min(prev + 1, Object.keys(stepList).length))} 
                            disabled={step === Object.keys(stepList).length || showQuiz}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button variant = 'contained' color="success" onClick={handleFinish}>
                            Finish
                        </Button>
                    )}
                    <Button variant = 'outlined' onClick={fetchQuiz}>
                        Take a Quiz?
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}

export default LearningPage;
