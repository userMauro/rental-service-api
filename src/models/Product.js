const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Product = sequelize.define('Product', {
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
});

Product.belongsToMany(User, {
    through: 'UserProduct', // Nombre de la tabla intermedia
    foreignKey: 'productId', // Nombre de la clave foránea en la tabla intermedia
});

module.exports = Product;
