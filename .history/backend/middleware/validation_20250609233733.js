// backend/middleware/validation.js
const { body,param, validationResult } = require('express-validator');




const validateUser = [
  // Validate user_name: 2–50 characters
  body('user_name')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  // Validate user_email: valid email, no spaces
  body('user_email')
    .trim()
    .isEmail().withMessage('Email must be valid')
    .not().contains(' ').withMessage('Email cannot contain spaces'),

  // Validate user_password: required, string
  body('user_password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  // Final validation error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Sanitize and validate post creation/update
const validatePost = [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('post_content')
    .trim()
    .isLength({ min: 5, max: 280 }).withMessage('Post content must be 5-280 characters')
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
  param('postId')
    .isInt().withMessage('post_id must be an integer')
    .custom(async (value) => {
      const post = await Post.findByPk(value);
      if (!post) {
        throw new Error('post_id must reference an existing post');
      }
      return true;
    }),
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

module.exports = { validatePost, validateComment, validateUser };
