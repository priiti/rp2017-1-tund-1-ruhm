/* globals describe, it */
const expect = require('chai').expect
const Topic = require('./../../models/Topic')

module.exports = (supertest) => {
  let savedTopic;
  describe('/POST topics', () => {
    it('should create new topic', (done) => {
      const topic = {
        name: 'new topic'
      }
      supertest
        .post('/api/topics')
        .send(topic)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          const { topic } = res.body
          savedTopic = topic
          done()
        })
    })

    it('should not create new topic with name shorter than 4', (done) => {
      const topic = {
        name: 'taa'
      }
      supertest
        .post('/api/topics')
        .send(topic)
        .expect(422, done)
    })

    it('should not create new topic without name', (done) => {
      supertest
        .post('/api/topics')
        .send()
        .expect(422, done)
    })
  })

  describe('/GET topics', () => {
    it('should get all topics', (done) => {
      supertest
        .get('/api/topics')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { topics } = res.body
          expect(topics).to.be.an('array')
          expect(topics[0]).to.have.property('_id')
          expect(topics[0]).property('name').to.equal('new topic')
          done()
        })
    })
  })

  describe('/GET:id topics', () => {
    it('should get topic by given id', (done) => {
      supertest
        .get(`/api/topics/${savedTopic._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { topic } = res.body
          expect(topic).to.be.an('object')
          expect(topic).to.have.property('_id')
          expect(topic).property('name').to.equal('new topic')
          done()
        })
    })
  })

  describe('/PUT:id topics', () => {
    const nameForTopic = 'Changed topic name'
    it('should update given topic with new topic name', (done) => {
      supertest
        .put(`/api/topics/${savedTopic._id}`)
        .set('Accept', 'application/json')
        .send({
          name: nameForTopic
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { topic } = res.body
          expect(topic).to.be.an('object')
          expect(topic).to.have.property('_id')
          expect(topic).property('name').to.equal(nameForTopic)
          done()
        })
    })

    it('should have an updated database object', (done) => {
      Topic.findOne({ _id: savedTopic._id })
        .then((topic) => {
          expect(topic).property('name').to.equal(nameForTopic)
          done()
        })
        .catch((error) => {
          done(error)
        })
    })

    it('should not update topic with bad id', (done) => {
      supertest
        .put(`/api/topics/123`)
        .set('Accept', 'application/json')
        .send({
          name: nameForTopic
        })
        .expect(404, done)
    })
  })

  describe('/DELETE:id topics', () => {
    it('should delete topic with a given id', (done) => {
      supertest
        .delete(`/api/topics/${savedTopic._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { topic } = res.body
          expect(topic).property('_id').to.equal(savedTopic._id)
          expect(topic).to.have.property('deleted')
          done()
        })
    })

    it('should not delete topic with invalid id', (done) => {
      supertest
        .delete(`/api/topics/12345`)
        .set('Accept', 'application/json')
        .expect(404, done)
    })
  })
}
