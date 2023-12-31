const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD
} = process.env
