import React, { useState } from "react";
import { Link } from "react-router-dom";

function ModulePage() {
    const topics = ["Encryption", "Decryption", "Hashing", "Salting", "Key Exchange", "Digital Signatures", "Certificates", "Public Key Infrastructure", "Symmetric Key Encryption", "Asymmetric Key Encryption"];
    
    return (
        <div>
            <Link to="/main" className="back-link">← Back to Dashboard</Link>
            <h1>Training Modules</h1><br></br>
            <h2>Interact with our carefully curated learning material.</h2>
            {topics.map(topic => (
                <div key={topic}>
                    <h3><Link to={`/main/modules/${topic}`}>{topic}</Link></h3>
                </div>
            ))}
        </div>
    );
}

export default ModulePage;