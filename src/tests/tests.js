/* globals describe, before */
const server = require('./../index')
const supertest = require('supertest')(server)
const Topic = require('./../models/Topic')
// const expect = require('expect')

describe('/api', () => {
  before(async () => {
    await Topic.remove({})
  })
  describe('./topics/topics.js', () => require('./routes/topics.test')(supertest))
})
