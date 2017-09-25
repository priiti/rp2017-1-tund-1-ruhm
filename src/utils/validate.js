const { body, validationResult } = require('express-validator/check')

const validationCheck = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}

exports.topic = [
  body('name').exists().withMessage('Name must exist.')
  .isLength({ min: 4 }).withMessage('Name must be at least 4 characters long.'),
  validationCheck
]

exports.curriculum = [
  body('curriculum').exists().withMessage('Curriculum name must exist.')
  .isLength({ min: 4 }).withMessage('Curriculum name must be at least 4 characters long.'),
  body('manager').exists().withMessage('Manager name must exist')
  .isLength({ min: 4 }).withMessage('Manager name must be at least 4 characters long.'),
  validationCheck
]
