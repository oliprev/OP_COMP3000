const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Organisation = require('../models/Organisation');
const authenticateToken = require('../functions/authenticateToken');
const validateIds = require('../functions/validateIds');

// CREATE route - for creating an organisation
router.post('/create', authenticateToken, async (req, res) => {
    const { name, domain } = req.body;
    try {
        const newOrganisation = new Organisation({ name, domain });
        const savedOrganisation = await newOrganisation.save();
        res.status(201).json(savedOrganisation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE route - for inviting a user to an organisation
router.post('/:organisationId/invite', authenticateToken, async (req, res) => {
    try {
        
    }