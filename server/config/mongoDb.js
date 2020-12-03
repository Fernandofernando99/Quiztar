const { MongoClient } = require('mongodb')
const databaseUrl = 'mongodb://localhost:27017/'

const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })

client.connect()

const db = client.db('quizstar-db')

module.exports = db