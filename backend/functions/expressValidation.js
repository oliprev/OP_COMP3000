const { validationResult } = require('express-validator');

const expressValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const sanitisedErrors = errors.array().map(({ msg, param, location }) => ({
      msg, param, location
    }));
    return res.status(400).json({ errors: sanitisedErrors });
  }
  next();
};

module.exports = expressValidation;