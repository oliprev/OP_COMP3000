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

router.get('/knowledge-areas/:id', async (req, res) => {
    try {
        const knowledgeArea = await KnowledgeArea.findById(req.params.id);
        res.status(200).json(knowledgeArea);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/knowledge-areas/:id/subtopics', async (req, res) => {
    try {
        const knowledgeArea = await KnowledgeArea.findById(req.params.id);
        res.json({
            knowledgeArea: knowledgeArea.name,
            subtopics: knowledgeArea.subtopics.map(subtopic => ({
                _id: subtopic._id,
                name: subtopic.name
            }))
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/knowledge-areas/:id/subtopics/:subtopicId', async (req, res) => {
    try {
        const knowledgeArea = await KnowledgeArea.findOne({ "subtopics._id": req.params.subtopicId });
        const subtopic = knowledgeArea.subtopics.find(subtopic => subtopic._id.toString() === req.params.subtopicId);
        res.json({
            subtopic: subtopic.name,
            sections: subtopic.sections
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;