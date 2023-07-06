const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError'); //importación del controlador de errores
const globalErrorHandler = require('./controllers/error.controller'); //importación del manejador de errores

//routes
const userRouter = require('./routes/users.routes');
const restaurantRouter = require('./routes/restaurants.routes');
const mealRouter = require('./routes/meals.routes');
const orderRouter = require('./routes/orders.routes');

const app = express(); //inicializar o instanciar la aplicación de express

app.use(express.json()); //para que mi backend acepte peticiones por medio del body, es decir para que el usuario me envíe información a través del body en formato json

app.use(cors()); //es un metodo de seguridad que permite que mi backend acepte peticiones de diferentes dominios

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Proporciona información detallada sobre las solicitudes que llegan al servidor, como la URL, el método HTTP, el código de estado de respuesta, el tiempo de respuesta, entre otros.
}

// endpoints o rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `can't find ${req.originalUrl} on this server! 😡`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
