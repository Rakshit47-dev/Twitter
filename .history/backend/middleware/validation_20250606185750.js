// backend/middleware/validation.js
const { body, validationResult } = require('express-validator');

// Sanitize and validate post creation/update
const validatePost = [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('post_content')
    .trim()
    .isLength({ min: 5, max: 280 }).withMessage('Post content must be 5-250 characters')
    .custom(value => {
      if (/<[^>]*>/g.test(value)) throw new Error('HTML tags are not allowed');
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    next();
  }
];

// Sanitize and validate comment creation/update
const validateComment = [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('comment')
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('Comment must be 2-200 characters')
    .custom(value => {
      if (/<[^>]*>/g.test(value)) throw new Error('HTML tags are not allowed');
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    next();
  }
];

module.exports = { validatePost, validateComment };
