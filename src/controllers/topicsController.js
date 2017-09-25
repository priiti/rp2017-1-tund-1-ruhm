const Topic = require('./../models/Topic')
const { ObjectId } = require('mongodb')

exports.getAllTopics = async (req, res) => {
  const topics = await Topic.find({})
  return res.json({ topics })
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
  return res.json({ topic })
}

// db.topics.find({"name": /^topic name$/i}).pretty()

exports.addNewTopic = async (req, res) => {
  const { name } = req.body
  const newTopic = new Topic({
    name: name
  })
  const topic = await newTopic.save()
  if (topic) {
    res.status(201).json({
      topic
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
  const topic = await Topic.findByIdAndUpdate(id, { deleted: new Date() }, { new: true })
  if (!topic) {
    return res.status(404).send()
  }
  return res.json({ topic })
}
