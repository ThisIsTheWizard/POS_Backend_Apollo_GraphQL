const { gql } = require('apollo-server')

exports.common = gql`
  scalar Date
  scalar Object

  input OptionDataType {
    limit: Int
    skip: Int
    sort: Object
  }
`
