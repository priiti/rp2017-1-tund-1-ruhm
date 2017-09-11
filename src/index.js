const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const databaseConnection = require('./database/database')
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

databaseConnection.createDatabaseConnection()
  .then((dbConnected) => {
    if (dbConnected) console.log('Database connected! 💁')
    const listener = app.listen(process.env.APP_PORT || 3000, () =>
      console.log('App started in ' +
        process.env.NODE_ENV +
        ' on port ' +
        listener.address().port
      )
    )
  })
  .catch((error) => {
    console.log(error)
  })
