// Main backend code
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const geminiRoutes = require('./routes/geminiRoutes'); // Import gemini routes

const app = express(); // Initialises express app
const server = http.createServer(app); // Creates express server
const PORT = 9000; // Sets port number
const cors = require('cors'); // Imports cors

app.use(cors({ origin: 'http://localhost:3001' })); // Allows requests from frontend
app.use(express.json()); // Allows JSON parsing
app.use('/api/users', userRoutes); // Defines user route URL
app.use('/api/gemini', geminiRoutes); // Defines gemini route URL

mongoose.connect(process.env.URI) // Connects to MongoDB
    .then(() => console.log('Connected to MongoDB')) // Logs success message
    .catch(err => console.log(err)); // Logs error message

app.get('/', (req, res) => { // Verfies server is running
    res.send('Hello World');
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Logs server running