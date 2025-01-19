const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
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


router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    
    if (!isQueryRelevant(prompt)) {
        res.status(400).json({ message: 'Prompt is not relevant.' });
        return;
    }
    
    try {
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;