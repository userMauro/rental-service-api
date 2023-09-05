const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
});

User.belongsToMany(Product, {
    through: 'UserProduct', // Nombre de la tabla intermedia
    foreignKey: 'userId', // Nombre de la clave foránea en la tabla intermedia
});

module.exports = User;
