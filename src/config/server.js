const dotenv = require('dotenv')

dotenv.config()

// console.log('process.env:', process.env)

module.exports = {
  SERVER_PORT
} = process.env
