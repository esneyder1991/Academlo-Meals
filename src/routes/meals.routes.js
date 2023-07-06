const mealController = require('../controllers/meals.controller');
const express = require('express');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const mealMiddleware = require('./../middlewares/meals.middleware');
const restaurantMiddleware = require('./../middlewares/restaurants.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.get('/', mealController.findAllMeals);

router.post(
  '/:id',
  authMiddleware.protect,
  restaurantMiddleware.existRestaurant,
  validationsMiddleware.createMealValidation,
  authMiddleware.restrictTo('admin'),
  mealController.createMeal
);

router
  .use('/:id', mealMiddleware.existMeal)
  .route('/:id')
  .get(mealController.findOneMeal)
  .patch(
    authMiddleware.protect,
    validationsMiddleware.updateMealValidation,
    authMiddleware.restrictTo('admin'),
    mealController.updateMeal
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealController.deleteMeal
  );

module.exports = router;
