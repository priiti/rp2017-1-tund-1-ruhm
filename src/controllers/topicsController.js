const Topic = require('./../models/Topic')
const { ObjectId } = require('mongodb')

exports.getAllTopics = async (req, res) => {
  const topics = await Topic.find({})
  res.json({
    topics
  })
}

exports.getTopicById = async (req, res) => {
  const topicId = req.params.id
  if (!ObjectId.isValid(topicId)) {
    return res.status(404).send()
  }
  const topic = await Topic.findById({ _id: topicId })
  if (!topic) {
    throw new Error()
  }
  res.json({
    topic
  })
}

// db.topics.find({"name": /^topic name$/i}).pretty()

exports.addNewTopic = async (req, res) => {
  const { name } = req.body
  const newTopic = new Topic({
    name: name
  })
  const savedTopic = await newTopic.save()
  if (savedTopic) {
    res.status(201).json({
      savedTopic
    })
  }
}

exports.updateExistingTopic = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  const topic = await Topic.findByIdAndUpdate(
    id,
    { name },
    { new: true })

  if (!topic) {
    return res.status(404).send()
  }
  res.json({
    topic
  })
}

exports.deleteTopicById = async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }
  const topic = await Topic.findByIdAndUpdate(id, { deleted: new Date() })
  if (!topic) {
    return res.status(404).send()
  }
  res.status(200).send(topic)
}
