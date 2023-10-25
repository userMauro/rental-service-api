const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.ENUM('Entra', 'Sale', 'A reparar', 'De baja'),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Product;
