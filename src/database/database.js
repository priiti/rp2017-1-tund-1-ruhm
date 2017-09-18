const mongoose = require('mongoose')

mongoose.Promise = global.Promise
exports.createDatabaseConnection = () => {
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }, (error, db) => {
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error)
      }
      resolve(db)
    })
  })
}
