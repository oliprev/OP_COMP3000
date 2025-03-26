import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LearningPage() {
    const { topic, subtopic, section } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading ] = useState(true);
    const [step, setStep] = useState(1);
    const [names, setNames] = useState({
        topic: "",
        subtopic: "",
        section: null
    });
    const stepList = {
        1: "introduction",
        2: "core-concept-1",
        3: "core-concept-2",
        4: "example",
        5: "summary"
    };

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const endpoint = section
                    ? `http://localhost:9000/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}/sections/${section}`
                    : `http://localhost:9000/api/cybok/knowledge-areas/${topic}/subtopics/${subtopic}`;
    
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

    const fetchLearningContent = async (stepType) => {
        if (!names.topic || !names.subtopic) return;
    
        const experienceLevel = localStorage.getItem('experienceLevel') || "beginner";
        setLoading(true)

        try {
            const response = await axios.get('http://localhost:9000/api/gemini/generate-content', {
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
    
    useEffect(() => {
        const stepType = stepList[step];
        if (stepType && names.topic && names.subtopic) {
            fetchLearningContent(stepType);
        }
    }, [step, names]);

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Learning Page</h1> 
            <div>
                {loading ? (
                    <p>Loading content...</p>
                ) : content ? (
                <div>
                    <p>{content.content}</p>
                </div>
                ) : (
                    <p>No content available.</p>
                )}
            </div>
            <div>
                <button onClick={() => setStep(prev => Math.max(prev - 1, 1))} disabled={step === 1}>
                    Back
                </button>
                <button onClick={() => setStep(prev => Math.min(prev + 1, Object.keys(stepList).length))} disabled={step === Object.keys(stepList).length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default LearningPage;
