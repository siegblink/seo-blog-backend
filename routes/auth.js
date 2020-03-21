const express = require('express')
const router = express.Router()
const { signup, signin, signout } = require('../controllers/auth')
const { requireSignin } = require('../controllers/auth')

// Validators
const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')
const { userSigninValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)
// Test
router.get('/secret', requireSignin, function(req, res) {
  res.json({
    message: 'You have access to secret page.',
  })
})

module.exports = router
