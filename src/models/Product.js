const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: 'Product', // Nombre del modelo
  }
);

module.exports = Product;

Product.belongsToMany(User, {
  through: 'UserProduct', // Nombre de la tabla intermedia
  foreignKey: 'productId', // Nombre de la clave foránea en la tabla intermedia
});
