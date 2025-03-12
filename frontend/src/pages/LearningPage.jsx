import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

function LearningPage() {
    const { topic, subtopic, section } = useParams();

    useEffect(() => {
        // Fetches content based on section if subtopic has them
        if (section) {
        // Otherwise, fetches content based on subtopic
        } else {
        };
    }, [topic, subtopic, section]);

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Learning Page</h1> 
        </div>
    );
}

export default LearningPage;
