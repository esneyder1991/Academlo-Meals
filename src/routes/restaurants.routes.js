const express = require('express');

//Controller
const restaurantController = require('../controllers/restaurants.controller');
const reviewController = require('../controllers/review.controller');

//Middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const restaurantMiddleware = require('./../middlewares/restaurants.middleware');
const validationsMiddleware = require('./../middlewares/validations.middleware');
const reviewMiddleware = require('../middlewares/reviews.middleware');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.findAll)
  .post(
    authMiddleware.protect,
    validationsMiddleware.createRestaurantValidation,
    authMiddleware.restrictTo('admin'),
    restaurantController.create
  );

router
  .route('/:id')
  .get(
    restaurantMiddleware.existRestaurant,
    restaurantController.findOne
  )
  .patch(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    validationsMiddleware.updateRestaurantValidation,
    authMiddleware.restrictTo('admin'),
    restaurantController.update
  )
  .delete(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.delete
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.existRestaurant,
  reviewController.createReview
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.existReview,
    restaurantMiddleware.existRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(
    authMiddleware.protectAccountOwner,
    reviewController.updateReview
  )
  .delete(
    authMiddleware.protectAccountOwner,
    reviewController.deleteReview
  );

module.exports = router;
