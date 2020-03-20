const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
// Bring in routes
const blogRoutes = require('./routes/blog')

// App
const app = express()

// Database
mongoose
  .connect(process.env.DATABASE_CLOUD, {
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

// Routes middleware
app.use('/api', blogRoutes)

// Port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
