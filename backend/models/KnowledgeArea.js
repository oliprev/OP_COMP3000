const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String }
});

const SubtopicSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    sections: [SectionSchema] 
});

const KnowledgeAreaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    subtopics: [SubtopicSchema] 
});

module.exports = mongoose.model('KnowledgeArea', KnowledgeAreaSchema);
