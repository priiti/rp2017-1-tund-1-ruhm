/* globals describe */
const server = require('./../index')
const supertest = require('supertest')(server)
// const expect = require('expect')

describe('/api', () => {
  describe('./topics/topics.js', () => require('./routes/topics.test')(supertest))
})
