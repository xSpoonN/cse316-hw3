// Tag Document Schema
const mongoose = require('mongoose')
// Define a schema
const TagSchema = new mongoose.Schema({
  name: String,
  url: String
})
module.exports = mongoose.model('Tag', TagSchema)
