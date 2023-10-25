const authRouter = require('express').Router();

const { register, login, resetUserPassword, isAdmin } = require('../controllers/auth')

authRouter.post('/login', login)
authRouter.post('/register', isAdmin, register)
authRouter.put('/resetPass', isAdmin, resetUserPassword)

module.exports = authRouter;
