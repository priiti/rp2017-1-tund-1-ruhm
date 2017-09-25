const Curriculum = require('./../models/Curriculum')

exports.getAllCurriculums = async (req, res) => {
  const curriculums = await Curriculum.find({})
  return res.json({ curriculums })
}

exports.addNewCurriculum = async (req, res, next) => {
  const { curriculum, manager } = req.body
  const newCurriculum = new Curriculum({
    curriculum,
    manager
  })
  const savedCurriculum = await newCurriculum.save()
    .catch(err => {
      if (err.code === 11000) {
        return res.status(422).json({ errors: [{ msg: 'Duplicate key' }] })
      }
      next(err)
    })
  return res.status(201).send({ savedCurriculum })
}
