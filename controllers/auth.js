const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = function(req, res) {
  User.findOne({ email: req.body.email }).exec(function(err, user) {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken',
      })
    }

    const { name, email, password } = req.body
    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let newUser = new User({ name, email, password, profile, username })
    newUser.save(function(err, userData) {
      if (err) {
        return res.status(400).json({ error: err })
      }
      res.json({ message: 'Sign up success! Please sign in.' })
      // res.json({ user: userData })
    })
  })
}

exports.signin = function(req, res) {
  const { email, password } = req.body
  // Check if user exist
  User.findOne({ email }).exec(function(err, userData) {
    if (err || !userData) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please sign up.',
      })
    }
    // Authenticate
    if (!userData.authenticate(password)) {
      return status(400).json({
        error: 'Email and password do not match.',
      })
    }
    // Generate a token and send to client
    const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.cookie('token', token, { expiresIn: '1d' })
    const { _id, username, name, email, role } = userData
    return res.json({
      token,
      user: { _id, username, name, email, role },
    })
  })
}

exports.signout = function(req, res) {
  res.clearCookie('token')
  res.json({
    message: 'Sign out success.',
  })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
})
