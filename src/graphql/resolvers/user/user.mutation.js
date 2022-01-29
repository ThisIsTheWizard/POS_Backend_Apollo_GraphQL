const { userService } = require('../services')

module.exports = {
  async createAnUser(parent, args, context) {
    const { req } = context
    const { inputData = {} } = args
    req.body = JSON.parse(JSON.stringify(inputData))

    return await userService.createAnUserForMutation(req)
  },

  async updateAnUser(parent, args, context) {
    const { req } = context
    const { inputData = {} } = args
    req.body = JSON.parse(JSON.stringify(inputData))

    return await userService.updateAnUserForMutation(req)
  },

  async removeAnUser(parent, args, context) {
    const { req } = context
    const { inputData = {} } = args
    req.body = JSON.parse(JSON.stringify(inputData))

    return await userService.removeAnUserForMutation(req)
  },

  async loginAnUser(parent, args, context) {
    const { req } = context
    const { inputData = {} } = args
    req.body = JSON.parse(JSON.stringify(inputData))

    return await userService.loginAnUserForMutation(req)
  }
}
