const User = require('../models/User')

class UserController {
  
  static findUserById (req, res) {
    User.findOne(req.params.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
 
  static addUser (req, res) {
    const { name, age, gender } = req.body
    const userObj = {
      name: name,
      age: +age,
      gender: gender
    }
    User.insertOne(userObj)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
