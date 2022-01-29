require('dotenv').config()
const { createAHashString } = require('./crypto-helpers')
const JWT = require('jsonwebtoken')

const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const HASHED_ACCESS_TOKEN = createAHashString(ACCESS_TOKEN)

const JWTLogin = async (userId) => {
  try {
    const signParams = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      iss: 'The-Wizard',
      token: HASHED_ACCESS_TOKEN,
      userId
    }

    return await JWT.sign(signParams, ACCESS_TOKEN)
  } catch (err) {
    return err
  }
}

const JWTVerify = async (token) => {
  try {
    const { token: hashedAccessToken, userId = '' } = await JWT.verify(
      token,
      ACCESS_TOKEN
    )

    if (hashedAccessToken !== HASHED_ACCESS_TOKEN) {
      return false
    }

    return userId
  } catch (error) {
    return error
  }
}

module.exports = {
  JWTLogin,
  JWTVerify
}
