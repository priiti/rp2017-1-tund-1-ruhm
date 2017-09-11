const Topic = require('./../models/Topic')
const { ObjectId } = require('mongodb')

module.exports = {
  async getAllTopics (req, res) {
    try {
      const topics = await Topic.find({})
      res.send(topics)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getTopicById (req, res) {
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
  },
  async addNewTopic (req, res) {
    try {
      const userInputForTopic = req.body
      if (!userInputForTopic) {
        throw new Error('No input for topic!')
      }
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
}
