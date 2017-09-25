const router = require('express').Router()
const topicsController = require('./../controllers/topicsController')
const { asyncMiddleware } = require('./../utils/common')
const validate = require('./../utils/validate')

// Topics
router.get('/', asyncMiddleware(topicsController.getAllTopics))
router.get('/:id', asyncMiddleware(topicsController.getTopicById))
router.post('/',
  validate.topic,
  asyncMiddleware(topicsController.addNewTopic))
router.put('/:id',
  validate.topic,
  asyncMiddleware(topicsController.updateExistingTopic))
router.delete('/:id', asyncMiddleware(topicsController.deleteTopicById))

module.exports = router
