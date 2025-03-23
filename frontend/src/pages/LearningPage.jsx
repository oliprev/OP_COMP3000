import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LearningPage() {
    const [step, setStep] = useState(1);
    const { topic, subtopic, section } = useParams();
    const [names, setNames] = useState({
        topic: "",
        subtopic: "",
        section: null
    });;

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
    

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Learning Page</h1> 
        </div>
    );
}

export default LearningPage;
