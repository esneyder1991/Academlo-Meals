const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    // catch((err) => next(err)) es lo mismo que decir catch(next);
  };
};

module.exports = catchAsync;
