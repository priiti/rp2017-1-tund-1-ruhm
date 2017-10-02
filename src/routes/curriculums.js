const router = require('express').Router()
const curriculumController = require('./../controllers/curriculumController')
const { asyncMiddleware } = require('./../utils/common')
const validate = require('./../utils/validate')

router.get('/', asyncMiddleware(curriculumController.getAllCurriculums))
router.post('/',
  validate.curriculum,
  asyncMiddleware(curriculumController.addNewCurriculum))
router.delete('/:id',
  asyncMiddleware(curriculumController.deleteCurriculum)
)

module.exports = router
