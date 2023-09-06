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
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Depósito',
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Product;

const User = require('./User');

Product.belongsTo(User, {
    foreignKey: 'currentOwnerId',
    as: 'currentOwner',
});

Product.belongsToMany(User, {
    through: 'ProductOwnership',
    foreignKey: 'productId',
    as: 'owners',
});

Product.belongsToMany(User, {
    through: 'ProductHistory',
    foreignKey: 'productId',
    as: 'history',
});
