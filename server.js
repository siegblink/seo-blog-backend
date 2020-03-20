const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// App
const app = express()

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected.'))

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// CORS
if (process.env.NODE_ENV === 'development') {
  // This logic is only for browser to browser communication.
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// Routes
app.get('/api', function(res, res) {
  res.json({ time: Date().toString() })
})

// Port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
