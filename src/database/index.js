const dotenv = require('dotenv')
const { size } = require('lodash')
const mongoose = require('mongoose')

dotenv.config()

const initMongoDBConnection = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    if (size(isConnected)) {
      console.log('Mongoose has been successfully connected!!!')
      return true
    }

    console.log('Mongoose could not be connected!!!')
    return false
  } catch (e) {
    console.log(e)
  }
}

module.exports = { initMongoDBConnection }
