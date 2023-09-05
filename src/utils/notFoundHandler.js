const notFoundRouter = require('express').Router();

notFoundRouter.get('*', (req, res) => {
    res.status(404).send({status: '404', msg: '404 not found' });
});

module.exports = notFoundRouter;
