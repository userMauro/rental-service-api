const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const ScanHistory = sequelize.define('ScanHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    scanDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Puedes almacenar la URL de la imagen o el nombre del archivo en el sistema de archivos.
        allowNull: true,
    },
    state: {
        type: DataTypes.ENUM('Entra', 'Sale', 'A reparar', 'De baja'),
        allowNull: false,
    },
    addressee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    scanOwner: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = ScanHistory;

const User = require('./User');
const Product = require('./Product');

User.hasMany(ScanHistory);
ScanHistory.belongsTo(User);

Product.hasMany(ScanHistory);
ScanHistory.belongsTo(Product);
