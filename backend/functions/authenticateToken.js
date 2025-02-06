const jwt = require('jsonwebtoken');

// Function to authenticate the token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(401).json({ message: 'Access denied. Token not present.' }); // If token is not present, return 401 status
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified; // Set user in request object
        next(); // Call next middleware
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' }); // If token is invalid / not present, return 400 status
    }
};

module.exports = authenticateToken;