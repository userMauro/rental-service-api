const authRouter = require('express').Router();

const { getLocations, createLocation, deleteLocation, modifyLocation } = require('../controllers/locations');
const { isAdmin } = require('../controllers/auth');

authRouter.get('/get', isAdmin, getLocations);
authRouter.post('/create', isAdmin, createLocation);
authRouter.delete('/delete/:id', isAdmin, deleteLocation);
authRouter.put('/modify/:id', isAdmin, modifyLocation);

module.exports = authRouter;
