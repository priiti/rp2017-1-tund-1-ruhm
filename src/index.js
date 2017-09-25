require('dotenv').config({ path: '.env' })
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const testEnvironment = process.env.NODE_ENV === 'test'

const app = express()

if (!testEnvironment) {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const topics = require('./routes/topics')
app.use('/api/topics', topics)

app.use((req, res, next) => {
  const error = new Error('Page not found')
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: process.env.NODE_ENV === 'development' ? error.message : ''
  })
})

if (!testEnvironment) {
  mongoose.set('debug', true)
}
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    if (testEnvironment) return
    const listener = app.listen(process.env.APP_PORT || 3005, () =>
      console.log(`App started in ${process.env.NODE_ENV} on port ${listener.address().port}`)
    )
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

module.exports = app
