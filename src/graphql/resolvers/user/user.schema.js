const mongoose = require('mongoose')
const validator = require('validator')
const { CreatedAtSchemas, UpdatedAtSchemas, Id, Message } = require('../common')

const UserSchema = new mongoose.Schema(
  [
    Id,
    {
      name: { type: String, required: true, unique: true },
      email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: Message.emailError
        }
      },
      password: { type: String, required: true }
    },
    CreatedAtSchemas,
    UpdatedAtSchemas
  ],
  {
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

module.exports = UserSchema
