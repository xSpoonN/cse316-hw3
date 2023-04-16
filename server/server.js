// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express')
const mongoose = require('mongoose')
/* const AnswerSchema = require('./models/answers')
const QuestionSchema = require('./models/questions')
const TagSchema = require('./models/tags') */

// Create a new Express app
const app = express()

// Set up a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/fake_so')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
/* db.on('connected', function () {
  const ansSchema = AnswerSchema()
  ansSchema.save(function (err, result) {
    if (err) {
      console.log('Could not save new book : ' + err)
      return
    }
    console.log('Created new book : ' + result)
  })
}) */

// Start the server and listen on port 8000
/* const server =  */app.listen(8000, () => {
  console.log('Server listening on https://localhost:8000')
})

// Handle server shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Server closed. Database instance disconnected.')
    process.exit(0)
  })
})
