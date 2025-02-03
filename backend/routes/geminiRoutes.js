const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../functions/authenticateToken');
const natural = require('natural');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const tokenizer = new natural.WordTokenizer();

const classifier = new natural.BayesClassifier();
classifier.addDocument('What is phishing?', 'phishing');
classifier.addDocument('How does encryption work?', 'encryption');
classifier.addDocument('How can I protect my password?', 'password');
classifier.addDocument('What is malware?', 'malware');
classifier.addDocument('How to prevent social engineering attacks?', 'social engineering');
classifier.addDocument('What is cybersecurity?', 'cybersecurity');
classifier.addDocument('How to secure my computer?', 'securing computer');
classifier.addDocument('How to protect my data?', 'data protection');
classifier.addDocument('How to secure my network?', 'network security');
classifier.addDocument('What conventions should I use for secure passwords?', 'password security');
classifier.addDocument('How do SQL injections work?', 'sql injection');
classifier.addDocument('What is a DDoS attack?', 'ddos attack');
classifier.addDocument('Tell me about different types of encryption.', 'types of encryption')

classifier.train();

function tokenizeInput(prompt) {
    return tokenizer.tokenize(prompt.toLowerCase());
}

function classifyQuery(prompt) {
    const tokens = tokenizeInput(prompt);
    return classifier.classify(tokens.join(' '));
}

function isQueryRelevant(prompt) {
    const category = classifyQuery(prompt);
    return category !== null && category !== undefined;
}

router.post('/chatbot', authenticateToken, async (req, res) => {
    const { prompt } = req.body;
    
    if (!isQueryRelevant(prompt)) {
        res.status(400).json({ message: 'Prompt is not relevant.' });
        return;
    }
    
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 100,  
                temperature: 0.3,
                topP: 0.9              
            }
        });
        
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
