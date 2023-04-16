// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express')
const mongoose = require('mongoose')

// Create a new Express app
const app = express()

// Set up a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/fake_so', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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
