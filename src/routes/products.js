const authRouter = require('express').Router();

const { createProduct, scanProduct, transferProduct, getProductHistory, getProducts } = require('../controllers/products');
const { isAdmin } = require('../controllers/auth');
const { multarMiddleware } = require('../config/s3');

authRouter.get('/scan/:barcode', scanProduct);
authRouter.get('/history/:productId', isAdmin, getProductHistory);
authRouter.get('/list/:location?', isAdmin, getProducts)
authRouter.put('/transfer', multarMiddleware('image'), transferProduct);
authRouter.post('/create', isAdmin, multarMiddleware('image'), createProduct);

module.exports = authRouter;
