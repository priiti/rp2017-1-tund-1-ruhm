const Curriculum = require('./../models/Curriculum')

exports.getAllCurriculums = async (req, res) => {
  const curriculums = await Curriculum.find({})
  return res.json({ curriculums })
}

exports.addNewCurriculum = async (req, res) => {
  const { curriculum, manager } = req.body
  const newCurriculum = new Curriculum({
    curriculum,
    manager
  })
  const savedCurriculum = await newCurriculum.save()
  if (savedCurriculum) {
    return res.json({ savedCurriculum })
  }
}
