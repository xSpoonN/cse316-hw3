// Question Document Schema
// Question Document Schema
const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const Tag = require('./tags')
// eslint-disable-next-line no-unused-vars
const Answer = require('./answers')
// Define a schema
const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  asked_by: String,
  ask_date_time: Date,
  views: Number,
  url: String
})
/* const SomeModel =  */mongoose.model('Question', QuestionSchema)
