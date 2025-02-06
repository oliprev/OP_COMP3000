const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../functions/authenticateToken');
const natural = require('natural');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const tokenizer = new natural.WordTokenizer();

const classifier = new natural.LogisticRegressionClassifier();
classifier.addDocument('What is phishing?', 'phishing');
classifier.addDocument('How does encryption work?', 'encryption');
classifier.addDocument('How can I protect my password?', 'password');
classifier.addDocument('What is malware?', 'malware');
classifier.addDocument('How to recognise social engineering attacks?', 'social engineering');
classifier.addDocument('What is cybersecurity?', 'cybersecurity');
classifier.addDocument('How to secure my computer?', 'securing computer');
classifier.addDocument('How to protect my data?', 'data protection');
classifier.addDocument('How to secure my network?', 'network security');
classifier.addDocument('What conventions should I use for secure passwords?', 'password security');
classifier.addDocument('How do SQL injections work?', 'sql injection');
classifier.addDocument('What is a DDoS attack?', 'ddos attack');
classifier.addDocument('Tell me about different types of encryption.', 'types of encryption');
classifier.addDocument('How to avoid phishing?', 'phishing');
classifier.addDocument('What are the signs of a phishing email?', 'phishing');
classifier.train();

function tokenizeInput(prompt) {
    return tokenizer.tokenize(prompt.toLowerCase());
}

function classifyQuery(prompt) {
    const tokens = tokenizeInput(prompt);
    const classifications = classifier.getClassifications(tokens.join(' '));
    return classifications[0];
}

function isQueryRelevant(prompt, threshold = 0.7) {
    const classification = classifyQuery(prompt);
    const relevantCategories = [
        'phishing', 'encryption', 'password', 'malware', 'social engineering',
        'cybersecurity', 'securing computer', 'data protection', 'network security',
        'password security', 'sql injection', 'ddos attack', 'types of encryption'
    ];
    return classification && classification.value >= threshold && relevantCategories.includes(classification.label);
}

router.post('/chatbot', authenticateToken, async (req, res) => {
    const { prompt } = req.body;
    const staticPrompt = "Do not reply with any formatting options, like making the text bold, bullet points, or asterisks under any circumstance - it formats badly.";
    
    if (!isQueryRelevant(prompt)) {
        res.status(400).json({ message: 'Prompt is not relevant.' });
        return;
    }
    
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: staticPrompt + prompt }] }],
            generationConfig: {
                maxOutputTokens: 200,  
                temperature: 0.3,
                topP: 0.9              
            }
        });
        
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!reply) {
            res.status(500).json({ message: 'Error generating content.' });
            return;
        }
        
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ message: 'Error generating content.' });
    }
});

router.get('/generate-email', authenticateToken, async (req, res) => {
    const type = Math.random() < 0.5 ? 'phishing' : 'legitimate';
    const experienceLevel = req.query.experienceLevel || 'beginner';

    let prompt;
    if (type === 'phishing') {
        prompt = experienceLevel === 'Beginner' 
            ? 'Generate a simple phishing email that is easy to understand. Keep it concise and straightforward. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY.'
            : experienceLevel === 'Intermediate'
            ? 'Generate a realistic phishing email that is moderately convincing. Use clear language and some deceptive techniques. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY.'
            : experienceLevel === 'Advanced'
            ? 'Generate a highly sophisticated phishing email that is unique and highly convincing. Use advanced language and techniques to make it very deceptive. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY.'
            : 'Generate a very realistic phishing email that is unique and highly convincing. Keep it concise but deceiving. Do not include any notes about the legality of phishing emails, as the user is meant to guess and the user knows phishing is wrong. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY.';
    } else {
        prompt = experienceLevel === 'Beginner' 
            ? 'Generate a simple legitimate email that is easy to understand. Keep it concise and straightforward. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic.'
            : experienceLevel === 'Intermediate'
            ? 'Generate a moderately professional legitimate email that is convincing. Use clear language and some professional techniques. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic.'
            : experienceLevel === 'Advanced'
            ? 'Generate a highly professional legitimate email that is unique and convincing. Use advanced language and techniques to make it very professional. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic.'
            : 'Generate a legitimate (NOT phishing) email that is unique and professional. Keep it concise but convincing. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic.';
    }

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.8
            }
        });

        const email = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!email) {
            return res.status(500).json({ message: 'Error generating email.' });
        }

        res.json({ email, type });

    } catch (error) {
        console.error("Email Generation Error:", error);
        res.status(500).json({ message: 'Error generating email.' });
    }
});

module.exports = router;
