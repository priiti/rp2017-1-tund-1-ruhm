/* globals describe, before */
const server = require('./../index')
const supertest = require('supertest')(server)
const Topic = require('./../models/Topic')
const Curriculum = require('./../models/Curriculum')
// const expect = require('expect')

const testCurriculum = [{
  curriculum: 'Informaatika',
  manager: 'Romil'
}]

describe('/api', () => {
  before(async () => {
    await Topic.remove({})
    await Curriculum.remove({})
  })
  describe('/topics/topics.js', () => require('./routes/topics.test')(supertest))
})
