const express = require('express');

//Controllers
const orderController = require('./../controllers/orders.controllers');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const validMealMiddleware = require('./../middlewares/validMeal.middleware');

const router = express.Router();

router.post(
  '/',
  validationsMiddleware.createOrderValidation,
  validMealMiddleware.validMeal,
  orderController.createOrder
);

// router.get('/:me', orderController.findAllOrdersUser);

// router
//   .route('/:id')
//   .patch(orderController.updateOrder)
//   .delete(orderController.deleteOrder);

module.exports = router;
