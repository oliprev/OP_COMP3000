const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../functions/authenticateToken');
const validateIds = require('../functions/validateIds');

// CREATE route - for registration
router.post('/register', async (req, res) => {
    const { name, email, password, dateOfBirth, skillTestAnswers } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const experienceLevel = determineExperienceLevel(skillTestAnswers); // Determine experience level based on skill test answers
        const newUser = new User({ name, email, password: hashedPassword, dateOfBirth, experienceLevel });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function determineExperienceLevel(answers) {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    if (correctAnswers >= 5) return 'intermediate';
    if (correctAnswers >= 8) return 'advanced';
    return 'beginner';
}

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

// UPDATE route - for updating password
router.put('/updatepassword', authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        if (!validateIds([userId])) return res.status(400).json({ message: "Invalid userId." });
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials provided." });
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) return res.status(404).json({ message: "User not found." });

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;