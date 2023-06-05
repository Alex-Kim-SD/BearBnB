// /home/alex5/BearBnB/backend/utils/validation.js
const { check, validationResult } = require('express-validator');



const handleValidationErrors = (req, _res, next) => {
  console.log('\n', 'BACKED UTILS VALIDATION RESULT', validationResult(req))
  const validationErrors = validationResult(req);
  console.log('\n', 'BACKED UTILS VALIDATION RESULT.ERRORS', validationErrors.errors)


  if (validationErrors.errors.length) {
    console.log('yes alex')
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    console.log('\n', 'err.errors array',err.errors)
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};

const validateReviewBody = [
  check('review')
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Bad Request', errors: errors.array() });
    }
    next();
  },
];

const validateBookingBody = [
  check('start_date')
    .isISO8601()
    .withMessage('startDate must be a valid ISO 8601 date'),
  check('end_date')
    .isISO8601()
    .withMessage('endDate must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (value <= req.body.start_date) {
        throw new Error('endDate cannot be on or before startDate');
      }
      return true;
    }),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateReviewBody,
  validateBookingBody,
};
