require('dotenv').config({ path: '.env' })
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(morgan('dev'))
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

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    const listener = app.listen(process.env.APP_PORT || 3005, () =>
      console.log(`App started in ${process.env.NODE_ENV} on port ${listener.address().port}`)
    )
  })
  .catch((error) => {
    console.error(error)
  })
