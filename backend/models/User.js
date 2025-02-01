const { type } = require('mocha/lib/utils');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, match: /^[a-zA-Z\s\-]+$/ },
    email: { type: String, required: true, unique: true, maxlength: 254 },
    password : { type: String, required: true },
    dateOfBirth : { type: Date, required: true },
    experienceLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
});

module.exports = mongoose.model('User', userSchema);

