/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET topics', () => {
    it('should get all topics', (done) => {
      supertest
        .get('/api/topics')
        .expect(200, done)
    })
  })

  describe('/POST topics', () => {
    // it('should create new topic', (done) => {
    //   const topic = {
    //     name: 'new topic'
    //   }

    //   supertest
    //     .post('/api/topics')
    //     .send(topic)
    //     .expect(201, done)
    // })
    it('should not create new topic with name shorter than 4', (done) => {
      const topic = {
        name: 'taa'
      }

      supertest
        .post('/api/topics')
        .send(topic)
        .expect(422, done)
    })
  })
}
