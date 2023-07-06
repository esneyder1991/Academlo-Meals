const express = require('express');

//Controllers
const userController = require('../controllers/users.controller');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationsMiddleware.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationsMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.existUser)
  .route('/:id')
  .patch(
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
