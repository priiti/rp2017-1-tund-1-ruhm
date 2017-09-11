const router = require('express').Router()
const topicsController = require('./../controllers/topicsController')

router.get('/', topicsController.getAllTopics)
router.get('/:id', topicsController.getTopicById)

router.post('/', topicsController.addNewTopic)

module.exports = router
