const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const topics = require('./routes/topics')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

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

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Connected databases')
})

const listener = app.listen(process.env.APP_PORT || 3000, () =>
  console.log('App started in ' +
    process.env.NODE_ENV +
    ' on port ' +
    listener.address().port
  )
)
