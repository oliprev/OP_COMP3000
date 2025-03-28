import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
    return (
        <Container>
            <Link to="/register" className="back-link">← Back</Link>
            <h1>SecuLearn - Privacy Policy</h1>
            <p>This Privacy Policy describes numerous important factors surrounding your (the user's) information, and how SecuLearn handles it. It adheres to the GDPR / Data Protection Act 2018.</p>
            <p>By using the platform, you agree to the collection and storage of the following information:</p>
            <ol>     
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your password</li>
                <li>Your date of birth</li>
                <li>Your cybersecurity skill level</li>
                <li>Your acceptance of the Terms of Service</li>
                <li>Your acknowledgment of the Privacy Policy</li>
            </ol>
            <p>We will utilise your data appropriately to personalise your experience, and give you access to the platform with your unique profile.</p>
            <p>All of your personal data is stored securely in a database - all passwords are hashed and salted prior to storage. This means that passwords are not stored in plaintext.</p>
            <p>No data that identifies you will be shared with any third parties. Your skill level is the only thing that is passed to Google Gemini for content generation.</p>
            <p>All users have the option to delete their profile, along with all information, with instant effect from the 'Profile' page - or users can contact me personally expressing their wishes.</p>
            <p>Any future updates to this Privacy Policy will be communicated in advance.</p>
            <p>If you have any questions, do not hesitate to contact me at oliver.prevett@students.plymouth.ac.uk.</p>
            <p><em>Version 1.0 - March 26, 2025 23:36PM</em></p>
        </Container>
    );
}

export default PrivacyPolicyPage;