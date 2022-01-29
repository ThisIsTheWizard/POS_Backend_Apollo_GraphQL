const { common } = require('./gqls/common')
const { users } = require('./gqls/users')

const typeDefs = [common, users]

module.exports = { typeDefs }
