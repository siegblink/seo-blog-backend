const User = require('../models/user')
const shortId = require('shortid')

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
