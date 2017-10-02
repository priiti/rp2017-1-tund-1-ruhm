/* globals describe, it */
const expect = require('chai').expect
const Curriculum = require('./../../models/Curriculum')

module.exports = (supertest) => {
  let savedCurriculumDatabase = null
  const testCurriculum = {
    curriculum: 'Maths',
    manager: 'Inga Petuhhov'
  }
  describe('POST /curriculums', () => {
    it('should return new curriculum', (done) => {
      supertest
        .post('/api/curriculums')
        .send(testCurriculum)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          const { savedCurriculum } = res.body
          savedCurriculumDatabase = savedCurriculum
          expect(savedCurriculum).property('curriculum').to.equal(testCurriculum.curriculum)
          expect(savedCurriculum).property('manager').to.equal(testCurriculum.manager)
          done()
        })
    })
    it('should have saved new curriculum to database', (done) => {
      Curriculum.findOne({ _id: savedCurriculumDatabase._id })
        .then((res) => {
          expect(res).property('curriculum').to.equal(testCurriculum.curriculum)
          expect(res).property('manager').to.equal(testCurriculum.manager)
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
    it(`should return 'Duplicate key' error for already existing curriculum`, (done) => {
      supertest
      .post('/api/curriculums')
      .send(testCurriculum)
      .set('Accept', 'application/json')
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        const { errors } = res.body
        expect(errors[0]).property('msg').to.equal('Duplicate key')
        done()
      })
    })
  })
  describe('GET /curriculums', () => {
    it('should return curriculums', (done) => {
      supertest
        .get('/api/curriculums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { curriculums } = res.body
          expect(curriculums).to.be.an('array')
          expect(curriculums[1]).to.be.an('object')
          expect(curriculums).to.have.lengthOf(2)
          done()
        })
    })
  })
  describe('DELETE /curriculums', () => {
    it('should delete curriculum from database', (done) => {
      supertest
        .delete(`/api/curriculums/${savedCurriculumDatabase._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { curriculum } = res.body
          expect(curriculum).to.be.an('object')
          expect(curriculum).to.have.property('deleted')
          done()
        })
    })
  })
}
