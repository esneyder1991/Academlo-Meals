const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }
  const order = await Order.create({
    mealId,
    quantity,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
  });
  return res.json({
    status: 'success',
    order,
  });
});

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    where: {
      status: 'active',
      userId: sessionUser.id,
    },
  });
  return res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const resp = await order.update({ status: 'completed' });
  return res.status(200).json({
    status: 'success',
    message: 'Order completed',
    resp,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const resp = await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'The order has been cancelled',
  });
});
