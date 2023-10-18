const router = require('express').Router()

// middleware
const { authOK } = require('../controllers/auth')

// routes
const auth = require('./auth')
const products = require('./products')
const locations = require('./locations')
const notFound = require('../utils/notFoundHandler')

// endpoints
router.use('/auth', auth)
router.use('/product', authOK, products)
router.use('/locations', authOK, locations)
router.use('*', notFound)

module.exports = router
