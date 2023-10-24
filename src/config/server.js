require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('../routes/index');
const errorHandler = require('../utils/errorHandler');

const server = express();
server.name = 'Rental Service Server';

// MIDDLEWARES
    server.use(express.json());
    process.env.NODE_ENV !== 'production' && server.use(morgan('development'));
    
    server.use(cors());
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // cambiar '*' por ruta la del host cuando no es producción
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
   
// RUTEO LOS PATH Y MODULARIZO
    server.use('/', routes);
    server.use(errorHandler);

module.exports = server;
