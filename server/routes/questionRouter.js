const questionRouter = require('express').Router()
const QuestionController = require('../controllers/QuestionController')

questionRouter.get('/', QuestionController.showQuestions)
questionRouter.post('/', QuestionController.addQuestions)

module.exports = questionRouter