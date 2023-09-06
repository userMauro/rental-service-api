const authRouter = require('express').Router();

const { register, login, resetUserPassword } = require('../controllers/auth')

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.put('/resetPass', resetUserPassword)

module.exports = authRouter;
