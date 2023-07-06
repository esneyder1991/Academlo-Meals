const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

// para cumplir con las especificaciones de la tarea necesitamos lo siguiente del modelo: comment, rating, restaurantId y userId
exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body; //entregado por nosotros en el body
  const { id } = req.params; //entregado por nosotros en el body
  const uid = req.sessionUser.id; // obteniendo el sessionUser del authMiddleware.protect

  const resp = await Review.create({
    comment,
    rating,
    restaurantId: id,
    userId: uid,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The review has been created',
    resp,
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  const resp = await review.update({ comment, rating });

  return res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
    resp,
  });
});
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  // const resp = await review.update({ status: 'inactive' });
  return res.status(200).json({
    status: 'success',
    message: 'The review has been delected',
    resp,
  });
});
