const { ObjectId } = require('mongoose').Types;

const validateIds = (ids) => {
    return ids.every(id => ObjectId.isValid(id));
};

module.exports = validateIds;