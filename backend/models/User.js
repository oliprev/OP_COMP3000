const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, maxlength: 30 },
    name: { type: String, required: true, trim: true, match: /^[a-zA-Z\s\-]+$/ },
    email: { type: String, required: true, unique: true, maxlength: 254 },
    password : { type: String, required: true },
    role: { type: String, required: true, enum: ['individual', 'admin', 'employee']},
    dateOfBirth : { type: Date, required: true }
});

module.exports = mongoose.model('User', userSchema);

