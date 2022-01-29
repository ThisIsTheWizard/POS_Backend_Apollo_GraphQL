const { ApolloServer } = require('apollo-server')

const { typeDefs } = require('./schemas/index')

const { resolvers } = require('./resolvers/index')

const { decodeTokenForUserId } = require('./resolvers/user/user.helper')

// Execute GraphQL resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (context = {}) => {
    // Decode userId from authorization token
    const { req = {} } = context
    const userId = await decodeTokenForUserId(req)

    return { req: { userId } }
  }
})

module.exports = server
