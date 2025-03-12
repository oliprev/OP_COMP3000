import { useParams, Link } from "react-router-dom";

function LearningPage() {
    const { topic, subtopic } = useParams(); 

    return (
        <div>
            <Link to={`/main/topics/${topic}/subtopics`} className="back-link">← Back to Subtopics</Link>
            <h1>Learning Page</h1> 
        </div>
    );
}

export default LearningPage;
