const { split, size } = require('lodash')
const { CustomError } = require('../common')
const { JWTVerify } = require('../../../utils/helpers/jwt-helpers')

const { UserCollection } = require('../models')

exports.decodeTokenForUserId = async (req = {}) => {
  const { headers = {} } = req
  const { authorization = '' } = headers

  if (!size(authorization)) {
    return false
  }

  const [bearer = '', token = ''] = split(authorization, ' ')

  if (!(bearer && bearer.toLowerCase() === 'bearer' && token)) {
    return false
  }

  return await JWTVerify(token)
}

exports.getAnUser = async (query = {}) => {
  if (!size(query)) {
    throw new CustomError(404, 'Bad Request When Getting An User!')
  }

  return await UserCollection.findOne(query)
}

exports.getAnUserForQuery = async (req = {}) => {
  const { body = {}, userId = '' } = req
  const { query = {} } = body

  if (userId) {
    query._id = userId
  }

  return await this.getAnUser(query)
}

exports.getMultipleUsers = async (query = {}, options = {}) => {
  const { limit = 50, skip = 0, sort = { createdAt: 1 } } = options

  return await UserCollection.find(query).limit(limit).skip(skip).sort(sort)
}

exports.getMultipleUsersForQuery = async (req = {}) => {
  const { body = {} } = req
  const { query = {}, options = {} } = body

  return await this.getMultipleUsers(query, options)
}
