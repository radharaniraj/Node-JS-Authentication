const Pool = require('pg').Pool
require('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_USERNAME);

module.exports = {
    pool: pool
}