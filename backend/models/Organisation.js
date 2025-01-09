const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    domain: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model('Organisation', organisationSchema);

