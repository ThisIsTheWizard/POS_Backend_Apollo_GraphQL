const crypto = require('crypto')

const createAHashString = (string = '') => {
  return crypto.Hash('sha256').update(string).digest('hex')
}

module.exports = { createAHashString }
