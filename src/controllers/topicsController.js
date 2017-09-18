const Topic = require('./../models/Topic')
const { ObjectId } = require('mongodb')

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({})
    res.send(topics)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getTopicById = async (req, res) => {
  try {
    const topicId = req.params.id
    if (!ObjectId.isValid(topicId)) {
      return res.status(404).send()
    }
    const singleTopic = await Topic.findById({ _id: topicId })
    if (!singleTopic) {
      throw new Error()
    }
    res.json({
      singleTopic
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

// db.topics.find({"name": /^topic name$/i}).pretty()

exports.addNewTopic = async (req, res) => {
  try {
    const userInputForTopic = req.body
    if (!userInputForTopic) {
      throw new Error('No input for topic!')
    }
    // const option = `/^${userInputForTopic.name}$/i`
    // const existingTopic = await Topic.find({ name: option })

    // if (existingTopic !== null) {
    //   throw new Error('Topic exists already')
    // }

    const newTopic = await (new Topic(userInputForTopic)).save()
    if (newTopic) {
      res.json({
        newTopic
      })
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.updateExistingTopic = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.deleteTopicById = async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(404).send()
    }
    const topic = await Topic.findByIdAndUpdate(id, { deleted: new Date() })
    console.log(topic)
    if (!topic) {
      return res.status(404).send()
    }
    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
}
