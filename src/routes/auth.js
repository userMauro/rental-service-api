const authRouter = require('express').Router();

const { register, login, resetUserPassword, isAdmin, getUsers } = require('../controllers/auth')

authRouter.get('/users', isAdmin, getUsers)
authRouter.post('/login', login)
authRouter.post('/register', isAdmin, register)
authRouter.put('/resetPass', isAdmin, resetUserPassword)

module.exports = authRouter;
