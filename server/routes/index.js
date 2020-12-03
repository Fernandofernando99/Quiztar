const router = require('express').Router()
const questionRouter = require('./questionRouter')
const userRouter = require('./userRouter')

router.get('/', (req, res) => {
  res.json({
    msg: "Hello World!"
  })
})
router.use('/users', userRouter)
router.use('/quiztar', questionRouter)

module.exports = router