const mongoose = require('mongoose')
const nid = require('nid')

const Id = new mongoose.Schema({
  _id: {
    type: String,
    immutable: true
  }
})

Id.pre('save', function (next) {
  // For Seed:
  if (process.env.NODE_ENV === 'test') {
    this._id = this._id ? this._id : nid(17)
  } else {
    this._id = nid(17)
  }
  next()
})

const CreatedAtSchemas = new mongoose.Schema({
  createdAt: {
    type: Date,
    index: true,
    immutable: true,
    default: new Date()
  }
})

const CreatedBySchemas = new mongoose.Schema({
  createdBy: {
    type: String,
    index: true,
    immutable: true,
    default: 'SYSTEM'
  }
})

const CreatedAtCustomSchemas = new mongoose.Schema({
  createdAt: {
    type: Date,
    index: true,
    immutable: true,
    default: new Date()
  }
})

const UpdatedAtSchemas = new mongoose.Schema({
  updatedAt: {
    type: Date,
    index: true,
    immutable: true,
    default: new Date()
  }
})

module.exports = {
  Id,
  CreatedAtSchemas,
  CreatedAtCustomSchemas,
  CreatedBySchemas,
  UpdatedAtSchemas
}
