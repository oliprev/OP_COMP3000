const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    domain: { type: String, required: true, unique: true, trim: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Organisation', organisationSchema);

