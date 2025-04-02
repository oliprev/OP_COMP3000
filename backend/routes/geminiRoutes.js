const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../functions/authenticateToken');
const expressValidation = require('../functions/expressValidation');
const natural = require('natural');
const router = express.Router();
const { body, query } = require('express-validator');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Google API key
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Model name

const tokenizer = new natural.WordTokenizer(); // Initialises tokenizer

// Initialises classifier - huge range of categories to cover all possible cybersecurity queries
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
classifier.train(); // Trains the classifier based on all documents

// Tokenizes input
function tokenizeInput(prompt) {
    return tokenizer.tokenize(prompt.toLowerCase()); // Converts to lowercase
}

// Classifies query
function classifyQuery(prompt) {
    const tokens = tokenizeInput(prompt); // Tokenizes input
    const classifications = classifier.getClassifications(tokens.join(' ')); // Classifies input
    return classifications[0]; // Returns classification
}

// Checks if query is relevant - high threshold to ensure only more relevant queries are accepted
function isQueryRelevant(prompt, threshold = 0.7) {
    const classification = classifyQuery(prompt); // Classifies query
    const relevantCategories = [ // Relevant categories
        'phishing', 'encryption', 'password', 'malware', 'social engineering',
        'cybersecurity', 'securing computer', 'data protection', 'network security',
        'password security', 'sql injection', 'ddos attack', 'types of encryption'
    ];
    return classification && classification.value >= threshold && relevantCategories.includes(classification.label); // Returns whether query is relevant
}

// CREATE route - for chatbot
router.post('/chatbot', authenticateToken, 
    [
        body('prompt')
            .notEmpty().withMessage('Prompt is required.')
            .isLength({ max: 200 }).withMessage('Prompt must be less than 200 characters.')
            .trim()
            .escape(),
        expressValidation,
    ],
    async (req, res) => {
    const { prompt } = req.body; // Gets prompt from request body
    const staticPrompt = "Do not reply with any formatting options, like making the text bold, bullet points, or asterisks under any circumstance - it formats badly."; // Static prompt telling to not return any formatting options
    
    // If query is not relevant, return 400 status
    if (!isQueryRelevant(prompt)) {
        res.status(400).json({ message: 'Prompt is not relevant.' });
        return;
    }
    
    try {
        const result = await model.generateContent({ // Generates content
            contents: [{ role: "user", parts: [{ text: staticPrompt + prompt }] }], // Concatenates static prompt and user prompt
            generationConfig: { // Generation configuration 
                maxOutputTokens: 200, // Max output tokens - limits the length of the response
                temperature: 0.3, // Temperature - controls randomness
                topP: 0.9 // Top-p - controls diversity
            }
        });
        
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text; // Gets reply from result
        if (!reply) {
            res.status(500).json({ message: 'Error generating content.' });
            return;
        }
        
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ message: 'Error generating content.' });
    }
});

// READ route - for email generation
router.get('/generate-email', authenticateToken, 
    [
        query('experienceLevel')
            .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Experience level must be one of the following: beginner, intermediate, or advanced.')
            .optional()
            .trim()
            .escape(),
        expressValidation,
    ],
    async (req, res) => {
    const type = Math.random() < 0.5 ? 'phishing' : 'legitimate'; // Randomly selects type of email, heads or tails
    const experienceLevel = req.query.experienceLevel || 'Beginner'; // Gets experience level from query, defaults to beginner
    const staticPrompt = `
        Do not reply with any formatting options, like making the text bold, bullet points, or asterisks under any circumstance — it formats badly. 
        Also, do not include any reference to potential phishing sites — the user is meant to analyse the email's language. 
        Under no circumstances should you include any placeholders, notes, or meta-labels such as [link], [phishing link], [click here], or [malicious URL]. 
        Instead, generate text that implies a clickable element (e.g., 'View your invoice here') without describing it as a phishing link.
`;
 // Static prompt telling to not return any formatting options

    let prompt; // Initialises prompt
    if (type === 'phishing') { // If type is phishing ..
        prompt = experienceLevel === 'Beginner' // Sets prompt based on experience level
            ? 'Generate a simple phishing email that is easy to understand. Keep it concise and straightforward. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY. Ensure it is less than 300 words.'
            : experienceLevel === 'Intermediate'
            ? 'Generate a realistic phishing email that is moderately convincing. Use clear language and some deceptive techniques. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY. Ensure it is less than 300 words.'
            : experienceLevel === 'Advanced'
            ? 'Generate a highly sophisticated phishing email that is unique and highly convincing. Use advanced language and techniques to make it very deceptive. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY. Ensure it is less than 300 words.'
            : 'Generate a very realistic phishing email that is unique and highly convincing. Keep it concise but deceiving. Do not include any notes about the legality of phishing emails, as the user is meant to guess and the user knows phishing is wrong. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. DO NOT INCLUDE ANY PERIPHERAL INFORMATION THAT MAY GIVE IT AWAY. Ensure it is less than 300 words.';
    } else { // If type is legitimate ..
        prompt = experienceLevel === 'Beginner' // Sets prompt based on experience level
            ? 'Generate a simple legitimate email that is easy to understand. Keep it concise and straightforward. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. Ensure it is less than 300 words.'
            : experienceLevel === 'Intermediate'
            ? 'Generate a moderately professional legitimate email that is convincing. Use clear language and some professional techniques. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. Ensure it is less than 300 words.'
            : experienceLevel === 'Advanced'
            ? 'Generate a highly professional legitimate email that is unique and convincing. Use advanced language and techniques to make it very professional. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. Ensure it is less than 300 words.'
            : 'Generate a legitimate (NOT phishing) email that is unique and professional. Keep it concise but convincing. It can be a wide variety of topics, so be very creative. Include random recipient names, sender names, company names made from throwing words together, dates, and other details to make it more realistic. Ensure it is less than 300 words.';
    }

    try {
        const result = await model.generateContent({ // Generates content
            contents: [{ role: "user", parts: [{ text: staticPrompt + prompt }] }], // Sets prompt
            generationConfig: { // Generation configuration
                temperature: 0.8 // Temperature - controls randomness
            }
        });

        const email = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text; // Gets email from result

        if (!email) {
            return res.status(500).json({ message: 'Error generating email.' }); // Returns error if email is not generated
        }

        res.status(200).json({ email, type }); // Returns email and type

    } catch (error) {
        console.error("Email Generation Error:", error);
        res.status(500).json({ message: 'Error generating email.' });
    }
});

// READ route - for content generation
router.get('/generate-content', 
    [
        query('topic')
            .notEmpty().withMessage('Topic is required.')
            .trim()
            .escape(),
        query('subtopic')
            .notEmpty().withMessage('Subtopic is required.')
            .trim()
            .escape(),
        query('section')
            .optional()
            .trim()
            .escape(),
        query('experienceLevel')
            .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Experience level must be one of the following: beginner, intermediate, or advanced.')
            .optional()
            .trim()
            .escape(),
        query('step')
            .isIn(['introduction', 'core-concept-1', 'core-concept-2', 'example', 'summary']).withMessage('Step must be one of the following: introduction, core-concept-1, core-concept-2, example, or summary.'),
        expressValidation,
    ],
    async (req, res) => {
    const { topic, subtopic, section, experienceLevel, step } = req.query; // Gets topic and experience level from query
    const staticPrompt = "Do not reply with any formatting options, like making the text bold, bullet points, or asterisks under any circumstance - it formats badly. Please include line breaks here and there to make it look less overwhelming."; // Static prompt telling to not return any formatting options

    let prompt; // Initialises prompt
   
    if (section) {
        switch (step) {
            case "introduction":
                prompt = `Introduce the "${section}" section within the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it concise, under 100 words, and suitable for a ${experienceLevel} learner.`;
                break;
            case "core-concept-1":
                prompt = `Explain the most important concept within the "${section}" section in the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 200 words.`;
                break;
            case "core-concept-2":
                prompt = `Explore a more complex concept in the "${section}" section in the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 200 words.`;
                break;
            case "example":
                prompt = `Provide an cybersecurity related example to illustrate a concept from the "${section}" section in the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 250 words.`;
                break;
            case "summary":
                prompt = `Summarise the key points from the "${section}" section under the "${subtopic}" subtopic within the "${topic}" knowledge area for quick review. Keep it under 150 words.`;
                break;
            default:
                prompt = `Generate structured learning content for the section "${section}" under the subtopic "${subtopic}" in "${topic}" at a ${experienceLevel} level.`;
                break;
        }
    } else {
        switch (step) {
            case "introduction":
                prompt = `Introduce the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it concise, under 100 words, and suitable for a ${experienceLevel} learner.`;
                break;
            case "core-concept-1":
                prompt = `Explain the most importance concept within the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 200 words.`;
                break;
            case "core-concept-2":
                prompt = `Explore a more complex concept in the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 200 words.`;
                break;
            case "example":
                prompt = `Provide a cybersecurity related example to illustrate a concept from the "${subtopic}" subtopic in the "${topic}" knowledge area. Keep it under 250 words.`;
                break;
            case "summary":
                prompt = `Summarise the key points from the "${subtopic}" subtopic within the "${topic}" knowledge area for quick review. Keep it under 150 words.`;
                break;
            default:
                prompt = `Generate structured learning content for the subtopic "${subtopic}" in "${topic}" at a ${experienceLevel} level.`;
                break;
        }
    }

    try {
        const result = await model.generateContent({ // Generates content
            contents: [{ role: "user", parts: [{ text: staticPrompt + prompt }] }], // Sets prompt
            generationConfig: { // Generation configuration
                maxOutputTokens: 400, // Max output tokens
                temperature: 0.8 // Temperature - controls randomness
            }
        });

        const content = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text; // Gets content from result

        if (!content) {
            return res.status(500).json({ message: 'Error generating content.' }); // Returns error if content is not generated
        }

        res.status(200).json({ content }); // Returns content
    } catch (error) {
        console.error("Content Generation Error:", error);
        res.status(500).json({ message: 'Error generating content.' });
    }
});

// READ route - for quiz generation
router.get('/generate-quiz', 
    [ 
        query('topic')
            .notEmpty().withMessage('Topic is required.')
            .trim()
            .escape(),
        query('subtopic')
            .notEmpty().withMessage('Subtopic is required.')
            .trim()
            .escape(),
        query('section')
            .optional()
            .trim()
            .escape(),
        query('experienceLevel')
            .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Experience level must be one of the following: beginner, intermediate, or advanced.')
            .optional()
            .trim()
            .escape(),
        expressValidation,
    ],
    async (req, res) => {
    const { topic, subtopic, section, experienceLevel } = req.query;
    const staticPrompt = "Do not reply with any formatting options, like making the text bold, bullet points, or asterisks under any circumstance - it formats badly. Please include line breaks here and there to make it look less overwhelming.";
    const answerPrompt = "Provide the correct answer at the end by stating: 'Correct answer: <option letter>'.";

    let prompt;

    if (section) {
        prompt = `Create a multiple-choice (A-D) unique quiz question, which can be based on anything in the realm of the "${topic}" topic. Keep in mind the fact it is from the "${section}" section in the "${subtopic}" subtopic. The question must be suitable for a ${experienceLevel} learner. Make sure to include 4 options (A-D).`;
    } else {
        prompt = `Create a multiple-choice (A-D) unique quiz question, which can be based on anything in the realm of the "${topic}" topic. Keep in mind the fact it is from the "${subtopic}" subtopic. The question must be suitable for a ${experienceLevel} learner. Make sure to include 4 options (A-D).`;
    };
    
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: staticPrompt + prompt + answerPrompt }] }],
            generationConfig: {
                maxOutputTokens: 400,
                temperature: 0.8
            }
        });

        const content = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        function parseQuizResponse(text) {
            const lines = text.trim().split('\n').filter(Boolean);
            const question = lines[0].trim();
            const options = lines.slice(1, 5).map(opt => opt.trim());
            const correctLine = lines.find(line => /correct answer/i.test(line));
            const correctMatch = correctLine?.match(/([A-D])/i);
            const correctLetter = correctMatch ? correctMatch[1].toUpperCase() : null;
            const correctOption = options.find(opt => opt.startsWith(correctLetter));
        
            return {
                question,
                options,
                correctAnswer: { label: correctLetter, text: correctOption || null }
            };
        }

        function shuffleQuizWithCorrectLetter(parsed, originalLetter) {
            const originalIndex = originalLetter.charCodeAt(0) - 65;
            const correctOption = parsed.options[originalIndex];
            const shuffled = [...parsed.options].sort(() => Math.random() - 0.5);
            const newIndex = shuffled.indexOf(correctOption);
            const newLabel = String.fromCharCode(65 + newIndex);        
            const relabeled = shuffled.map((opt, idx) => {
                const label = String.fromCharCode(65 + idx);
                return `${label}) ${opt.slice(3).trim()}`;
            });
        
            return {
                question: parsed.question,
                options: relabeled,
                correctAnswer: {
                    label: newLabel,
                    text: relabeled[newIndex]
                }
            };
        }
        
        const parsedContent = parseQuizResponse(content);
        const originalLetterMatch = content.match(/Correct answer:\s*([A-D])/i);
        const originalLetter = originalLetterMatch ? originalLetterMatch[1].toUpperCase() : null;
        const shuffledContent = shuffleQuizWithCorrectLetter(parsedContent, originalLetter);

        if (!originalLetter || !parsedContent.correctAnswer.text) {
            return res.status(500).json({ message: 'Error while parsing quiz content.'});
        }
        res.status(200).json({ content, ...shuffledContent });
    } catch (error) {
        console.error("Quiz Generation Error:", error);
        res.status(500).json({ message: 'Error generating quiz.' });
    }
});

module.exports = router; // Exports router