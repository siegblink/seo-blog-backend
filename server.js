const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

// App
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// CORS
app.use(cors())

// Routes
app.get('/api', function(res, res) {
  res.json({ time: Date().toString() })
})

// Port
const port = process.env.PORT || 8000
app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})
