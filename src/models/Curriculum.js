const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CurriculumSchema = new Schema({
  curriculum: {
    type: String,
    required: true,
    unique: true
  },
  manager: {
    type: String,
    required: true
  },
  deleted: {
    type: Date
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Curriculum', CurriculumSchema)
