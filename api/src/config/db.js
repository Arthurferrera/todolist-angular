const mysql = require('mysql');

//local mysql db connection
const dbConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist'
});

dbConnect.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConnect;