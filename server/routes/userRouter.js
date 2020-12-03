const userRouter = require('express').Router()
const UserController = require('../controllers/UserController')

userRouter.get('/:id', UserController.findUserById)
userRouter.post('/', UserController.addUser)

module.exports = userRouter