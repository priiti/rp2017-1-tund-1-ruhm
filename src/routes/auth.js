const auth = require('./../controllers/auth')
const router = require('express').Router()
const { asyncMiddleware } = require('./../utils/common')

router.post('/local/login', asyncMiddleware(auth.localLogin))
router.post('/local/signup', asyncMiddleware(auth.localSignup))

module.exports = router
