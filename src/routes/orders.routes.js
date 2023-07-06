const express = require('express');

//Controllers
const orderController = require('./../controllers/orders.controllers');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const validMealMiddleware = require('./../middlewares/validMeal.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const orderMiddleware = require('./../middlewares/orders.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  validationsMiddleware.createOrderValidation,

  orderController.createOrder
);

router.get('/:me', orderController.findAllOrders);

router
  .route('/:id')
  .patch(
    orderMiddleware.existOrder,
    orderMiddleware.ValidStatus,
    orderController.updateOrder
  )
  .delete(
    orderMiddleware.existOrder,
    orderMiddleware.ValidStatus,
    orderController.deleteOrder
  );

module.exports = router;
