const { ObjectId } = require('mongodb')
const db = require('../config/mongoDb')
const collUsed = db.collection('users')

class Users {

  static findOne (userId) {
    return collUsed.findOne({_id: ObjectId(userId)})
  }

  static insertOne (userObj) {
    return collUsed.insertOne(userObj)
  }
}

module.exports = Users