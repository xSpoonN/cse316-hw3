// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express')
const mongoose = require('mongoose')
const Questions = require('./models/questions')
const Answers = require('./models/answers') // eslint-disable-line no-unused-vars
const Tags = require('./models/tags')

// Create a new Express app
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Set up a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/questions', async (req, res) => {
  try {
    const posts = await Questions.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/questions', async (req, res) => {
  const question = new Questions({
    title: req.body.title,
    body: req.body.text,
    tags: req.body.tags,
    asked_by: req.body.user,
    ask_date_time: Date.now
  })
  try {
    const newQuestion = await question.save()
    res.status(201).json(newQuestion)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.post('/questions/:qid/views', async (req, res) => {
  // find question whose _id matches qid
  const question = await Questions.findById(req.params._id)
  // increment views by 1
  question.views += 1
  // save the updated question
  try {
    const newQuestion = await question.save()
    res.status(201).json(newQuestion)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/questions/:questionId', async (req, res) => {
  try {
    const question = await Questions.findById(req.params.questionId)
    res.json(question)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/tags/:tagId', async (req, res) => {
  try {
    const tag = await Tags.findById(req.params.tagId)
    res.json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/tags', async (req, res) => {
  try {
    const tags = await Tags.find()
    res.json(tags)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/tags', async (req, res) => {
  const tag = new Tags({
    name: req.body.name
  })
  try {
    const newTag = await tag.save()
    res.status(201).json(newTag)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/answers', async (req, res) => {
  try {
    const answers = await Answers.find()
    res.json(answers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// app.get('/answers', async (req, res) => {
//   try {
//     const answers = await Answers.find()
//     res.json(answers)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

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
