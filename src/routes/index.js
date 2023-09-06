const router = require('express').Router()

// middleware
const { authOK } = require('../controllers/auth')

// routes
const auth = require('./auth')
const products = require('./products')
const notFound = require('../utils/notFoundHandler')

// endpoints
router.use('/auth', auth)
router.use('/products', authOK, products)
router.use('*', notFound)

module.exports = router
