const router = require('express').Router()
const topicsController = require('./../controllers/topicsController')

router.get('/', topicsController.getAllTopics)
router.get('/:id', topicsController.getTopicById)

router.post('/', topicsController.addNewTopic)
router.put('/:id', topicsController.updateExistingTopic)
router.delete('/:id', topicsController.deleteTopicById)

module.exports = router
