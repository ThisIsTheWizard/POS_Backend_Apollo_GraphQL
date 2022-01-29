const { userHelper } = require('../helpers')

module.exports = {
  async getAnUser(parent, args, context) {
    const { req } = context
    const { queryData = {} } = args
    req.body = {
      query: JSON.parse(JSON.stringify(queryData))
    }

    return await userHelper.getAnUserForQuery(req)
  },

  async getMultipleUsers(parent, args, context) {
    const { req } = context
    const { queryData = {}, optionData = {} } = args
    const { limit = 50, skip = 0, sort = { createdAt: 1 } } = optionData
    req.body = {
      query: JSON.parse(JSON.stringify(queryData)),
      options: { limit, skip, sort }
    }

    return await userHelper.getMultipleUsersForQuery(req)
  }
}
