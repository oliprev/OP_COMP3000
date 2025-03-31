const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const { body, param } = require('express-validator');
const authenticateToken = require('../functions/authenticateToken');
const validateIds = require('../functions/validateIds');
const expressValidation = require('../functions/expressValidation');

// CREATE route - for registration
router.post('/register', 
    [
        body('name')
            .notEmpty().withMessage('Name is required.')
            .matches(/^[a-zA-Z\s\-]+$/).withMessage('Name must contain only letters, spaces, or hyphens.')
            .trim()
            .escape(),
        body('email')
            .isEmail().withMessage('Invalid email format.')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
        body('dateOfBirth')
            .isISO8601().toDate().withMessage('Date of birth must be a valid date.')
            .custom((value) => {
                if (new Date(value) > new Date()) {
                    throw new Error('Date of birth cannot be set in the future.');
                }
                return true;
            }),
        body('experienceLevel')
            .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Experience level must be one of the following: beginner, intermediate, or advanced.'),
        body('tosAccepted')
            .equals('true').withMessage('Terms of Service must be accepted.'),
        body('privacyPolicyAccepted')
            .equals('true').withMessage('Privacy Policy must be accepted.'),
        expressValidation,
    ],
    async (req, res) => {
        const { name, email, password, dateOfBirth, experienceLevel, tosAccepted, privacyPolicyAccepted } = req.body;
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, password: hashedPassword, dateOfBirth, experienceLevel, tosAccepted, privacyPolicyAccepted });
                const savedUser = await newUser.save();
                const { _id, name, email, experienceLevel } = savedUser;
                res.status(201).json({ _id, name, email, experienceLevel });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
    });

// CREATE route - for login
router.post('/login', 
    [
        body('email')
            .isEmail().withMessage('Invalid email format.')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required.'),
        expressValidation,
    ],
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "Invalid credentials provided." });
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials provided." });
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, userId: user._id, experienceLevel: user.experienceLevel });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

// READ route - for getting name for dashboard display
router.get('/:userId/name', authenticateToken, 
    [
        param('userId')
            .notEmpty().withMessage('User ID is required.')
            .isMongoId().withMessage('Invalid User ID format.'),
        expressValidation,
    ],
    async (req, res) => {
        const { userId } = req.params;
        if (!validateIds([userId])) return res.status(400).json({ message: "Invalid credentials provided." });
        try {
            const user = await User.findOne({ _id: userId });
            if (!user) return res.status(404).json({ message: "User not found." });
            res.json({ name: user.name });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

// READ route - for getting all user information
router.get('/:userId', authenticateToken, 
    [
        param('userId')
            .notEmpty().withMessage('User ID is required.')
            .isMongoId().withMessage('Invalid User ID format.'),
        expressValidation,
    ],
    async (req, res) => {
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
router.put('/updatepassword', authenticateToken,
    [
        body('currentPassword')
            .notEmpty().withMessage('Current password is required.'),
        body('newPassword')
            .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long.'),
        expressValidation,
    ],
    async (req, res) => {
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

// DELETE route - for deleting a user
router.delete('/delete', authenticateToken, 
    [
        body('userId')
            .notEmpty().withMessage('User ID is required.')
            .isMongoId().withMessage('Invalid User ID format.'),
        expressValidation,
    ],
    async (req, res) => {
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