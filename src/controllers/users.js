const User = require('../models/user')
const { signToken, blacklistToken } = require('../utils/jwt')

module.exports.getUser = async (req, res) => {
  // Check if user from token exists
  const user = await User.findById(req.user._id)

  if (!user) return res.status(401).send({ msg: 'Not authorized' })

  let data = {
    user: {
      _id: user._id,
      email: user.login.email,
      updatedAt: user.updatedAt
    }
  }

  // update token if more than X seconds from last token update
  // time to send update token (1h)
  let secondsFromToUpdate =
    req.user.iat + parseInt(process.env.TOKEN_UPDATE_IN_SECONDS)
  let currentTimestampInSeconds = Date.now() / 1000
  let updateToken = secondsFromToUpdate <= currentTimestampInSeconds

  if (updateToken) {
    // save prev revoked token
    const blacklisted = await blacklistToken(req.user)
    if (!blacklisted) throw new Error('Unable to blacklist active token')

    console.log(`${req.user._id} token blacklisted`)
    console.log(`sending updated token to ${req.user._id}`)
    data.token = signToken(user)
  }

  return res.json(data)
}
