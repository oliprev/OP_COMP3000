import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

function LearningPage() {
    const { knowledgeArea, topic, subtopic, section } = useParams();
    const [step, setStep] = useState(1);

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Learning Page</h1> 
        </div>
    );
}

export default LearningPage;
