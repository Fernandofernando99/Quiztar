const { ObjectId } = require('mongodb')
const db = require('../config/mongoDb')
const collUsed = db.collection('questions')

class Question {
  static find () {
    return collUsed.find({}).toArray()
  }

  static insertAllQuestions (questionArr) {
    return collUsed.insertMany(questionArr)
  }

  static deleteAllQuestions () {
    return collUsed.deleteMany({})
  }
}

module.exports = Question