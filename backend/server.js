// Main backend code
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const app = express();
const server = http.createServer(app);
const PORT = 9000;  
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));