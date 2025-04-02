import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, LinearProgress, Button } from "@mui/material";

function LearningPage() {
    const { topic, subtopic, section } = useParams(); // Retrieves the topic, subtopic, and section IDs from the URL
    const [content, setContent] = useState(null); // State to store fetched learning content
    const [loading, setLoading ] = useState(true); // State to track loading status
    const [quiz, setQuiz] = useState(null); // State to store fetched quiz
    const [showQuiz, setShowQuiz] = useState(false); // State to track quiz visibility
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to store selected quiz answer
    const [isCorrect, setIsCorrect] = useState(null); // State to track quiz answer correctness
    const [step, setStep] = useState(1); // State to track learning step - informs backend on which content to fetch
    
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

    return (
        <div>
            <Link to = {`/main/topics/${topic}/subtopics`} className = "back-link">← Back to Subtopics</Link>
            {/* Renders the topic, subtopic, and section names */}
            <div style = {{ marginBottom: '30px' }}> 
                <Typography variant = 'h2' fontWeight={400}>{names.topic}</Typography>
                <h2>{names.subtopic}</h2>
                <h4>{names.section}</h4>
            </div>
                <h3>{stepNames[step]}</h3> 
            {/* Renders the learning content or quiz based on the showQuiz state */}
            {!showQuiz && (
                <div>
                    {loading ? (
                        <p>Loading content...</p>
                    ) : content ? (
                    <div>
                        <Paper elevation={4} style = {{ borderRadius: '10px', padding: '10px', marginBottom: '10px'}}>{content.content}</Paper> {/* Renders the learning content inside a Paper component */}
                    </div>
                    ) : (
                        <p>No content available.</p>
                    )}
                </div>
            )}
            {/* Renders the quiz if showQuiz is true */}
            {quiz && showQuiz && (
                <div>
                    <h2>Quiz</h2>
                    <p><strong>{quiz.question}</strong></p>
                    <ol>
                        {quiz.options.map((option, index) => ( // Maps over quiz options to render each option as a button
                            <li key = {index}> {/* Assigns the option index as the key */}
                                <Button onClick={() => {
                                    setSelectedAnswer(option); // Sets the selected answer to the option text
                                    setIsCorrect(option.trim().toLowerCase() === quiz.correctAnswer.text.trim().toLowerCase()); // Checks if the selected answer is correct
                                }}
                                disabled = {selectedAnswer !== null} // Disables the button if an answer has been selected
                                >
                                    {option}
                                </Button>
                            </li>
                        ))}
                    </ol>
                    {selectedAnswer && (
                        <p>Your answer: {selectedAnswer}</p>
                    )}
                    {isCorrect !== null && (
                        <p>{isCorrect ? "Correct!" : `Incorrect. The correct answer was ${quiz.correctAnswer.label}.`}</p> // Renders feedback based on the correctness state
                    )}
                    <Button onClick={() => setShowQuiz(false)}>
                        Finish Quiz
                    </Button>
                </div>
            )}
            <div>
                <Typography variant="body2">Progress</Typography>
                    <LinearProgress 
                    variant="determinate" 
                    value={(step / Object.keys(stepList).length) * 100} 
                    sx={{ height: 10, borderRadius: 5, mb: 1 }} 
                />   
                {/* Decrements the step state, and disables if step state cannot decrement */}
                <Button onClick={() => setStep(prev => Math.max(prev - 1, 1))} disabled = {step === 1 || showQuiz} > 
                    Back
                </Button>
                {/* Increments the step state, and disables if step state cannot increment */}
                <Button onClick={() => setStep(prev => Math.min(prev + 1, Object.keys(stepList).length))} disabled = {step === Object.keys(stepList).length || showQuiz}>
                    Next
                </Button>
                <Button onClick={fetchQuiz}>
                    Take a Quiz?
                </Button>
            </div>
        </div>
    );
}

export default LearningPage;
