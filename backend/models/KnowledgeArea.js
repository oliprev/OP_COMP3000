const mongoose = require('mongoose');

// Define the schema for the Section model
const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String }
});

// Define the schema for the Subtopic model
const SubtopicSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    sections: [SectionSchema] 
});

// Define the schema for the KnowledgeArea model, using Subtopic and Section schemas
const KnowledgeAreaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    subtopics: [SubtopicSchema] 
});

module.exports = mongoose.model('KnowledgeArea', KnowledgeAreaSchema);
