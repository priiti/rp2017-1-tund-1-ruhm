/* globals describe, before */
const server = require('./../index')
const supertest = require('supertest')(server)
const Topic = require('./../models/Topic')
const Curriculum = require('./../models/Curriculum')
// const expect = require('expect')

const testCurriculum = [{
  curriculum: 'Informatics',
  manager: 'Random Manager'
}]

describe('/api', () => {
  before(async () => {
    await Topic.remove({})
    await Curriculum.remove({})
    const testableCurriculum = new Curriculum(testCurriculum[0])
    await testableCurriculum.save()
  })
  describe('/topics/topics.js', () => require('./routes/topics.test')(supertest))
  describe('/curriculums/curriculums.js', () => require('./routes/curriculums.test')(supertest))
})
