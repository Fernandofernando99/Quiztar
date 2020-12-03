const Question = require('../models/Question')
const questionsList = require('../src/questions.json')
const User = require('../models/User')
const Users = require('../models/User')

class QuestionController {
  static addQuestions (req, res) {
    Question.deleteAllQuestions()
      .then(done => {
        return Question.insertAllQuestions(questionsList.questions)
      })
      .then(questions => {
        res.status(201).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showQuestions (req, res) {
    User.findOne(req.body.id)
      .then(found => {
        if (found) {
          return Question.find()
        } else {
          throw {msg: "Please input credential at the home page first", statusCode: 401}
        }
      })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(err.statusCode || 500).json(err)
      })
  }
}

module.exports = QuestionController