require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const geminiRoutes = require('./routes/geminiRoutes'); // Import gemini routes
const cybokRoutes = require('./routes/cybokRoutes'); // Import cybok routes

const app = express(); // Initialises express app
const helmet = require('helmet'); // Imports helmet for security
app.use(helmet()); // Uses helmet - sets various HTTP headers for security
const server = http.createServer(app); // Creates express server
const PORT = 9000; // Sets port number
const cors = require('cors'); // Imports cors

app.use(cors({ origin: 'http://localhost:3001' })); // Allows requests from frontend
app.use(express.json()); // Allows JSON parsing

// Sets rate limiters for different routes
const geminiLimiter = rateLimit({ windowMs: 60 * 1000, max: 20, message: 'You are being rate limited. Please try again later.' }); 
const cybokLimiter = rateLimit({ windowMs: 60 * 1000, max: 25, message: 'You are being rate limited. Please try again later.' });
const userLimiter = rateLimit({ windowMs: 60 * 1000, max: 25, message: 'You are being rate limited. Please try again later.' });

app.use('/api/users', userLimiter, userRoutes); // Defines user route URL
app.use('/api/gemini', geminiLimiter, geminiRoutes); // Defines gemini route URL
app.use('/api/cybok', cybokLimiter, cybokRoutes); // Defines cybok route URL

mongoose.connect(process.env.URI) // Connects to MongoDB
    .then(() => console.log('Connected to MongoDB')) // Logs success message
    .catch(err => console.log(err)); // Logs error message

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Logs server running