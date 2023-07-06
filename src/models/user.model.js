const { DataTypes } = require('sequelize'); //se importan los tipos de datos de sequelize dado que cada atributo de la base de dato va a ser de un tipo de dato diferente es decir: STRING, INTEGER(# entero), FLOAT(# decimal), etc.
const { db } = require('../database/config'); //importamos la configuración de la base de datos

//se crea una constante que va a contener el modelo dentro de la cual se define de la siguiente manera:

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allownull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.ENUM('normal', 'admin'),
    defaultValue: 'normal',
  },
});

module.exports = User;
