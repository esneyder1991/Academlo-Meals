const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.existUser = catchAsync(async (req, res, next) => {
  //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
  const { id } = req.params;

  //? 2. BUSCO EL USUARIO EN LA BASE DE DATOS
  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  //? 3. VALIDAR SI EL USUARIO EXISTE, SI NO, ENVIAR UN ERROR 404
  if (!user) {
    return next(new AppError(`User with id:${id} not found`, 404));
    // return res.status(404).json({
    //   status: 'error',
    //   message: `User with id: ${id} not found`,
    // });
  }
  //? 4.1 ENVIAR LA RESPUESTA A TRAVÉS DE LA REQUEST(REQ) CREANDO UNA NUEVA PROPIEDAD
  req.user = user;
  next();
});
