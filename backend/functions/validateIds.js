const { ObjectId } = require('mongoose').Types;

// Function to validate IDs
const validateIds = (ids) => {
    return ids.every(id => ObjectId.isValid(id)); // Check if all IDs are valid
};

module.exports = validateIds;