const express = require('express');
const router = express.Router();
const KnowledgeArea = require('../models/KnowledgeArea');
const validateIds = require('../functions/validateIds');
const expressValidation = require('../functions/expressValidation');

// CREATE route - developer side for adding new knowledge areas easily
router.post('/knowledge-areas', 
    [
        body('name')
            .notEmpty().withMessage('Name is required.')
            .trim()
            .escape(),
        body('description')
            .isOptional()
            .trim()
            .escape(),
        body('subtopics')
            .isArray().withMessage('Subtopics must be an array.')
            .custom((value) => {
                if (value.length === 0) {
                    throw new Error('Subtopics array cannot be empty.');
                }
                return true;
            }),
        body('subtopics.*.name')
            .notEmpty().withMessage('Subtopic name is required.')
            .trim()
            .escape(),
        body('subtopics.*.sections')
            .isOptional()
            .isArray().withMessage('Sections must be an array.'),
        body('subtopics.*.sections.*.name')
            .notEmpty().withMessage('Section name is required.')
            .trim()
            .escape(),
        body('subtopics.*.sections.*.description')
            .isOptional()
            .trim()
            .escape(),
        expressValidation,
    ],
    async (req, res) => {
        try {
            const { name, description, subtopics } = req.body;
            const newKnowledgeArea = new KnowledgeArea({ name, description, subtopics });
            await newKnowledgeArea.save();
            res.status(201).json(newKnowledgeArea);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

// READ route - for getting all knowledge areas
router.get('/knowledge-areas', async (req, res) => {
    try {
        const knowledgeAreas = await KnowledgeArea.find();
        res.status(200).json(knowledgeAreas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// READ route - for getting a specific knowledge area
router.get('/knowledge-areas/:id', 
    [
        body('id')
            .notEmpty().withMessage('Knowledge Area ID is required.')
            .isMongoId().withMessage('Invalid Knowledge Area ID format.'),
        expressValidation,
    ],
    async (req, res) => {
        try {
            const knowledgeArea = await KnowledgeArea.findById(req.params.id);
            res.status(200).json(knowledgeArea);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

// READ route - for getting subtopics of a specific knowledge area
router.get('/knowledge-areas/:id/subtopics', 
    [
        body('id')
            .notEmpty().withMessage('Knowledge Area ID is required.')
            .isMongoId().withMessage('Invalid Knowledge Area ID format.'),
        expressValidation,
    ],
    async (req, res) => {
        try {
         const knowledgeArea = await KnowledgeArea.findById(req.params.id);
            res.json({
                knowledgeArea: knowledgeArea.name,
                subtopics: knowledgeArea.subtopics.map(subtopic => ({
                    _id: subtopic._id,
                    name: subtopic.name,
                    sections: subtopic.sections
                }))
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

// READ route - for getting a specific subtopic of a specific knowledge area
router.get('/knowledge-areas/:id/subtopics/:subtopicId', 
    [
        body('id')
            .notEmpty().withMessage('Knowledge Area ID is required.')
            .isMongoId().withMessage('Invalid Knowledge Area ID format.'),
        body('subtopicId')
            .notEmpty().withMessage('Subtopic ID is required.')
            .isMongoId().withMessage('Invalid Subtopic ID format.'),
        expressValidation,
    ],
    async (req, res) => {
        try {
            const knowledgeArea = await KnowledgeArea.findOne({ "subtopics._id": req.params.subtopicId });
            const subtopic = knowledgeArea.subtopics.find(subtopic => subtopic._id.toString() === req.params.subtopicId);
            const result = {
                topicName: knowledgeArea.name,
                subtopicName: subtopic.name
            };
            res.json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

// READ route - for getting sections of a specific subtopic of a specific knowledge area
router.get('/knowledge-areas/:topicId/subtopics/:subtopicId/sections', 
    [
        body('topicId')
            .notEmpty().withMessage('Knowledge Area ID is required.')
            .isMongoId().withMessage('Invalid Knowledge Area ID format.'),
        body('subtopicId')
            .notEmpty().withMessage('Subtopic ID is required.')
            .isMongoId().withMessage('Invalid Subtopic ID format.'),
        expressValidation,
    ],
    async (req, res) => {
    try {
        const { topicId, subtopicId } = req.params;
        if (!validateIds([topicId, subtopicId])) return res.status(400).json({ message: "Invalid information provided." });
        const knowledgeArea = await KnowledgeArea.findById(topicId);
        const subtopic = knowledgeArea.subtopics.id(subtopicId);
        res.json(subtopic.sections);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// READ route - for getting a specific section of a specific subtopic of a specific knowledge area
router.get('/knowledge-areas/:topicId/subtopics/:subtopicId/sections/:sectionId?', 
    [
        body('topicId')
            .notEmpty().withMessage('Knowledge Area ID is required.')
            .isMongoId().withMessage('Invalid Knowledge Area ID format.'),
        body('subtopicId')
            .notEmpty().withMessage('Subtopic ID is required.')
            .isMongoId().withMessage('Invalid Subtopic ID format.'),
        body('sectionId')
            .optional()
            .isMongoId().withMessage('Invalid Section ID format.'),
        expressValidation,
    ],
    async (req, res) => {
        try {
            const { topicId, subtopicId, sectionId } = req.params;
            if (!validateIds([topicId, subtopicId, sectionId])) return res.status(400).json({ message: "Invalid information provided." });
            const knowledgeArea = await KnowledgeArea.findById(topicId);
            const subtopic = knowledgeArea.subtopics.id(subtopicId);
            const result = {
                topicName: knowledgeArea.name,
                subtopicName: subtopic.name
            };
            if (sectionId) {
                const section = subtopic.sections.id(sectionId);
                result.sectionName = section.name;
            }
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

module.exports = router;