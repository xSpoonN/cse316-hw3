// Answer Document Schema
const mongoose = require('mongoose')
// Define a schema
const AnswerSchema = new mongoose.Schema({
  text: String,
  ans_by: String,
  ans_date_time: Date,
  url: String
})
module.exports = mongoose.model('Answer', AnswerSchema)
