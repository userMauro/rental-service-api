const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: 'User', // Nombre del modelo
  }
);

module.exports = User;

const Product = require('./Product');

User.belongsToMany(Product, {
  through: 'UserProduct', // Nombre de la tabla intermedia
  foreignKey: 'userId', // Nombre de la clave foránea en la tabla intermedia
});
