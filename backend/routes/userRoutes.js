const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../functions/authenticateToken');
const validateIds = require('../functions/validateIds');

// CREATE route - for registration
router.post('/register', async (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, dateOfBirth });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE route - for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Invalid credentials provided." });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials provided." });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ route - for getting all user information
router.get('/:userId', authenticateToken, async (req, res) => {   
    const { userId } = req.params;
    if (!validateIds([userId])) return res.status(400).json({ message: "Invalid credentials provided." });
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).json({ message: "Invalid credentials provided." });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });       
    }
});

module.exports = router;