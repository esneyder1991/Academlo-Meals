const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const AppError = require('../utils/appError');

exports.existOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }
  req.order = order;
  next();
});

exports.ValidStatus = catchAsync(async (req, res, next) => {
  const { order } = req;
  if (order.status !== 'active') {
    return next(
      new AppError(
        `The order with status: ${order.status} not allowed to perform this action`,
        404
      )
    );
  }
});
