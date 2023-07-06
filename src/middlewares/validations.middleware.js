const { body, validationResult } = require('express-validator'); //importo el body a través de express-validatior para validar todo lo venga en él, por otro lado el validationResult que contiene los resultados de las validaciones que se hicieron

//Esta función es para capturar los errores de las validaciones que se encuentran abajo
const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

//USERS: name, email, password
exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

//RESTAURANT: name, address y rating

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  body('rating')
    .isNumeric()
    .withMessage('rating cannot be letters')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isLength({ min: 1, max: 5 }),
  validFields,
];

//name y address

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  validFields,
];

//MEALS: name y price

exports.createMealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .isNumeric()
    .withMessage('Price cannot be letters')
    .notEmpty()
    .withMessage('price cannot be empty'),
  validFields,
];

//name price
exports.updateMealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .isNumeric()
    .withMessage('Price cannot be letters')
    .notEmpty()
    .withMessage('price cannot be empty'),
  validFields,
];

//ORDERS: quantity y mealId

exports.createOrderValidation = [
  body('quantity').notEmpty().withMessage('quantity cannot be empty'),
  body('mealId').notEmpty().withMessage('mealId cannot be empty'),
  validFields,
];
