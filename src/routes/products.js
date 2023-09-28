const authRouter = require('express').Router();

const { createProduct, scanProduct, transferProduct, getProductHistory } = require('../controllers/products');
const { isAdmin } = require('../controllers/auth');

authRouter.post('/create', isAdmin, createProduct);
authRouter.get('/scan/:barcode', scanProduct);
authRouter.put('/transfer', transferProduct);
authRouter.get('/history/:productId', isAdmin, getProductHistory);

module.exports = authRouter;
