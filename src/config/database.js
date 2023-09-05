require('dotenv').config();

const { Sequelize } = require('sequelize');

// Configuración de la base de datos desde variables de entorno o configuración manual
const databaseConfig = {
  development: {
    dialect: 'postgres',
    host: process.env.LOCAL_DB_HOST,
    username: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    port: process.env.LOCAL_DB_PORT,
  },
  production: {
    dialect: 'postgres',
    host: process.env.PROD_DB_HOST,
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    port: process.env.PROD_DB_PORT,
  },
};


const env = process.env.NODE_ENV;
const dbConfig = databaseConfig[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    // Otras opciones de configuración
  }
);

module.exports = sequelize;
