var mysql = require("mysql");

// var con = mysql.createConnection({
// host: "localhost",
// user: "xenfe",
// password: "xenfeadmin",
// database: "svpppv"
// });

var con = mysql.createConnection({
  host: "localhost",
  user: "zonxo_admin",
  password: "XARAadmin",
  database: "zonxo_xenfe",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
