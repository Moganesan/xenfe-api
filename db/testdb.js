const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'Xenfe1',
//   password: 'Xenfe@123',
//   database: 'test1'
// });

var connection = mysql.createConnection({
  host: "localhost",
  user: "zonxo_admin",
  password: "XARAadmin",
  database: "zonxo_xenfe",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
