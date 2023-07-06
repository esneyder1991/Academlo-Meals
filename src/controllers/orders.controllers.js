const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const { meal, sessionUser } = req;
  console.log(sessionUser);
  const order = await Order.create({
    quantity,
    mealId: meal.dataValues.id,
    userId: sessionUser.dataValues.price,
    totalPrice: quantity * meal.dataValues.price,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The order has been created',
    order,
  });
});
exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});
exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const restaurant = req.restaurant;
  return res.status(200).json({
    status: 'success',
    message: 'meal found',
    meal,
    restaurant,
  });
});
exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const resp = await meal.update({ name, price });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been updated',
    resp,
  });
});
exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const resp = await meal.update({ status: 'inactive' });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been delected',
  });
});
