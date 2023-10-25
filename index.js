require('dotenv').config();

const sequelize = require('./src/config/database');
const server = require('./src/config/server');

const PORT = process.env.NODE_ENV === "development" ? process.env.LOCAL_PORT : process.env.PROD_PORT

// CONECTO EL SERVIDOR CON LA BASE DE DATOS Y LO DEJO ESCUCHANDO
sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`\u2705 server Rental Service listening at ${PORT}`);
    });
});
