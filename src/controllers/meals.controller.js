const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId,
  });
  req.meal = meal;
  return res.status(201).json({
    status: 'success',
    message: 'The meal has been created',
    meal: {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      restaurant: meal.restaurant,
    },
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
