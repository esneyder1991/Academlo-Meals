const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created',
    restaurant,
  });
});
exports.findAll = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json({
    status: 'success',
    message: 'Restaurant found',
    restaurant,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  const resp = await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated',
    resp,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const resp = await restaurant.update({ status: 'inactive' });

  return res.status(200).json({
    status: 'success',
    message: 'The restaurant has been delected',
  });
});
