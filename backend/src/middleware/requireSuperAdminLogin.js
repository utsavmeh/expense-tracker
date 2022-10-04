const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
// const Superadmin = mongoose.model('Superadmin')

require('dotenv').config({
  path: './src/.env',
})
const jwt_secret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in!' })
  }
  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, jwt_secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in' })
    }

    const { _id } = payload
    // Superadmin.findById(_id).then((superadmindata) => {
    //   req.superadmin = superadmindata
    //   next()
    // })
  })
}
