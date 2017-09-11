const router = require('express').Router()
const Topic = require('./../models/Topic')

router.get('/', async (req, res) => {
  const topics = await Topic.find({})
  res.json({
    topics
  })
})

router.get('/:id', (req, res) => {
  const topicId = req.params.id
  if (!topicId) return res.status(404)

  res.json({
    topicId,
    message: 'Topic'
  })
})

router.post('/', (req, res) => {
  const data = req.body
  res.json({
    successMessage: 'Topic added',
    data
  })
})

module.exports = router
