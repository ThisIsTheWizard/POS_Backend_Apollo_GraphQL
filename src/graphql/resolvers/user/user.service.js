const { CustomError } = require('../common')
const { isEmpty, size } = require('lodash')
const { JWTLogin } = require('../../../utils/helpers/jwt-helpers')
const { createAHashString } = require('../../../utils/helpers/crypto-helpers')
const { userHelper } = require('../helpers')

const { UserCollection } = require('../models')

exports.createAnUser = async (data) => {
  if (!size(data)) {
    throw new CustomError(400, 'Bad Request When Creating An User!')
  }

  const createdUserData = await UserCollection.create(data)

  if (!size(createdUserData)) {
    throw new CustomError(404, 'Unable To Create User!')
  }

  return createdUserData
}

exports.updateAnUser = async (query, data) => {
  if (!(size(query) && size(data))) {
    throw new CustomError(400, 'Bad Request When Updating An User!')
  }

  const updatedUserData = await UserCollection.findOneAndUpdate(query, data)

  if (!size(updatedUserData)) {
    throw new CustomError(404, 'Unable To Update User!')
  }

  return updatedUserData
}

exports.removeAnUser = async (query) => {
  if (!size(query)) {
    throw new CustomError(400, 'Bad Request When Deleting An User!')
  }

  const isUserDeleted = await UserCollection.findOneAndDelete(query)

  if (!isUserDeleted) {
    throw new CustomError(404, 'Unable To Delete User!')
  }

  return isUserDeleted
}

exports.createAnUserForMutation = async (req) => {
  const { body = {} } = req
  const {
    email = '',
    name = '',
    password = '',
    confirmation_password = ''
  } = body

  // Checking For Existing User
  const userInfo = await userHelper.getAnUser({ email })

  if (size(userInfo)) {
    throw new CustomError(400, 'There Is A Registered User With The Email!')
  }

  if (password !== confirmation_password) {
    throw new CustomError(400, 'Password did not match!')
  }

  const userCreationData = {
    email,
    name,
    password: createAHashString(password)
  }

  return await this.createAnUser(userCreationData)
}

exports.updateAnUserForMutation = async (req) => {
  const { body } = req
  const { query, data } = body

  if (!size(query) && !size(data)) {
    throw new CustomError(400, 'Bad Request When Updating User!')
  }

  const { password } = data

  if (size(password)) {
    data.password = createAHashString(password)
  }

  return await this.updateAnUser(query, data)
}

exports.removeAnUserForMutation = async (req) => {
  const { body = {} } = req

  return await this.removeAnUser(body)
}

exports.loginAnUserForMutation = async (req) => {
  const { body = {} } = req

  const { email = '', password = '' } = body

  const hasedPassword = createAHashString(password)

  const userInfo = await userHelper.getAnUser({ email })

  if (!size(userInfo)) {
    throw new CustomError(404, 'There is no user with that E-mail!')
  }

  const { _id: userId, password: userPassword } = userInfo || {}

  if (hasedPassword !== userPassword) {
    throw new CustomError(400, 'The Password Is Incorrect!')
  }

  return await JWTLogin(userId)
}
