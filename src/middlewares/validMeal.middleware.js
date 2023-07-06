const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id: mealId,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }
  req.meal = meal;
  next();
});
