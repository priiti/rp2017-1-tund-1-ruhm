const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum'
  },
  deleted: {
    type: Date
  }
},
  {
    timestamps: true
  }
)

// const populateCurriculum = function (next) {
//   this.populate({
//     path: 'curriculum'
//   })
//   next()
// }

// TopicSchema.pre('find', populateCurriculum)
// TopicSchema.pre('findOne', populateCurriculum)

module.exports = mongoose.model('Topic', TopicSchema)
