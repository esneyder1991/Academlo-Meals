//configuración dotenv para la implementación de las variables de entorno
require('dotenv').config();

const initModel = require('./models/initModels');

//importacion del app
const app = require('./app');

//importación de la base de datos
const { db } = require('./database/config');

//autenticación
db.authenticate()
  .then(() => console.log('Database authenticated ✌😁'))
  .catch((err) => console.log(err));

initModel();

//sincronización
db.sync().then(() => console.log('Database synced 👏'));

const PORT = process.env.PORT; // process es una variable en la que tengo acceso a todo el entorno de node

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😎😋`);
});
