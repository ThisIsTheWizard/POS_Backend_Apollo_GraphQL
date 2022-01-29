const mongoose = require('mongoose')

// User collection
const UserSchema = require('./user.schema')
const UserCollection = mongoose.model('users', UserSchema)

module.exports = UserCollection
