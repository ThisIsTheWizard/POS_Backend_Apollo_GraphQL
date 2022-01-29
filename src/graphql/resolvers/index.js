const { userQuery } = require('./queries')
const { userMutation } = require('./mutations')

const resolvers = {
  Query: {
    ...userQuery
  },
  Mutation: {
    ...userMutation
  }
}

module.exports = { resolvers }
