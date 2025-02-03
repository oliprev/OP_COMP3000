const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../functions/authenticateToken');
const natural = require('natural');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const keywords = [
    'encryption', 'phishing', 'password', 'malware', 'cybersecurity', 'social engineering'
];

function isQueryRelevant(prompt) {
    return keywords.some(keyword => prompt.toLowerCase().includes(keyword));
}


router.post('/chatbot', authenticateToken, async (req, res) => {
    const { prompt } = req.body;
    
    if (!isQueryRelevant(prompt)) {
        res.status(400).json({ message: 'Prompt is not relevant.' });
        return;
    }
    
    try {
        const result = await model.generateContent(prompt);
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;