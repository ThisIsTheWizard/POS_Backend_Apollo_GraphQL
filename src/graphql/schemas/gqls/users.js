const { gql } = require('apollo-server')

exports.users = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    createdAt: Date
    updatedAt: Date
  }

  input UserQueryInputType {
    _id: ID
    name: String
    email: String
    password: String
  }

  input UserMuationInputType {
    name: String
    email: String
    password: String
  }

  input UserCreateInputType {
    name: String!
    email: String!
    password: String!
    confirmation_password: String
  }

  input UserUpdateInputType {
    query: UserQueryInputType
    data: UserMuationInputType
  }

  input UserLoginInputType {
    email: String!
    password: String!
  }

  type Query {
    getAnUser(queryData: UserQueryInputType): User
    getMultipleUsers(
      queryData: UserQueryInputType
      optionData: OptionDataType
    ): [User]
  }

  type Mutation {
    createAnUser(inputData: UserCreateInputType): User
    updateAnUser(inputData: UserUpdateInputType): User
    removeAnUser(inputData: UserQueryInputType): User
    loginAnUser(inputData: UserLoginInputType): String
  }
`
