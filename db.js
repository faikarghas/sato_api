var mysql = require('mysql')

require('dotenv').config();

var pool  = mysql.createPool({
  connectionLimit : 200,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE,
  port            : process.env.PORT_MYSQL
});


console.log(pool);

module.exports = pool;


