const mongoose = require('mongoose')

module.exports = {
  createDatabaseConnection () {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }, (error, db) => {
        if (error) {
          reject(new Error('Error while connecting to database ⚠️\n', error))
        }
        if (db) {
          resolve(true)
        }
      })
    })
  }
}
