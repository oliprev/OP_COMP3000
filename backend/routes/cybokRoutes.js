const express = require('express');
const router = express.Router();
const KnowledgeArea = require('../models/KnowledgeArea');

// CREATE route - developer side for adding new knowledge areas easily
router.post('/knowledge-areas', async (req, res) => {
    try {
        const { name, description, subtopics } = req.body;
        const newKnowledgeArea = new KnowledgeArea({ name, description, subtopics });
        await newKnowledgeArea.save();
        res.status(201).json(newKnowledgeArea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/knowledge-areas', async (req, res) => {
    try {
        const knowledgeAreas = await KnowledgeArea.find();
        res.status(200).json(knowledgeAreas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;