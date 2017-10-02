const Curriculum = require('./../models/Curriculum')
const { ObjectId } = require('mongodb')

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

exports.deleteCurriculum = async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }
  const curriculum = await Curriculum.findByIdAndUpdate(
    id,
    { deleted: new Date() },
    { new: true }
  )
  if (!curriculum) {
    return res.status(404).send()
  }
  res.json({ curriculum })
}
