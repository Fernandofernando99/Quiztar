const express = require('express')
const router = require('./routes/index')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
})