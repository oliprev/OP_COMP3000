const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, match: /^[a-zA-Z\s\-]+$/ }, // Name with regex to allow only alphabets, spaces, and hyphens
    email: { type: String, required: true, unique: true, maxlength: 254 }, // Email with max length of 254 characters
    password : { type: String, required: true }, // Password - hashed upon submission
    dateOfBirth : { type: Date, required: true }, // Date of birth
    experienceLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] }, // Experience level with enum values
    tosAccepted: { type: Boolean, required: true }, // Terms of service accepted
    privacyPolicyAccepted: { type: Boolean, required: true }, // Privacy policy accepted

    progress: [
        {
            topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
            subtopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic' },
            sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
            completed: { type: Boolean, default: false },
            completedAt: { type: Date }
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

