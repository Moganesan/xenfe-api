// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "Pranav",
//   password: "Mysql@123",
//   database: "svpppv"

// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log(" SQL DB Connected!");
// });

const Mysqli = require("mysqli");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// let conn = new Mysqli({
//     Host: 'localhost', // IP/domain name
//     post: 3306, // port, default 3306
//     user: "xenfe",
//     password: "xenfeadmin",
//     database: "xenfe"
// });

let conn = new Mysqli({
  Host: "localhost", // IP/domain name
  user: "root", // username
  passwd: "mydb", // password
  db: "zonxo",
});

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "zonxo_admin",
//     password: "XARAadmin",
//     database: "zonxo_xenfe"
//     });

let db = conn.emit(false, "");

const secret = "Xenfe1$-secret";
const refreshsecret = "rXenfe1$-secret";

module.exports = {
  database: db,
  secret: secret,
  refreshsecret: refreshsecret,
  validJWTNeeded: (req, res, next) => {
    if (req.headers["authorization"]) {
      try {
        let authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          req.jwt = jwt.verify(authorization[1], secret);
          return next();
        }
      } catch (err) {
        return res.status(403).send("Authentication faileds");
      }
    } else {
      return res.status(401).send("No authorization header found.");
    }
  },
  hasAuthFields: (req, res, next) => {
    let errors = [];

    if (req.body) {
      if (!req.body.mobile) {
        errors.push("Missing mobile field");
      }
      if (!req.body.passwrd) {
        errors.push("Missing password field");
      }

      if (errors.length) {
        return res.status(400).send({ errors: errors.join(",") });
      } else {
        return next();
      }
    } else {
      return res
        .status(400)
        .send({ errors: "Missing mobile and password fields" });
    }
  },
  isPasswordAndMobileMatch: async (req, res, next) => {
    const myPlaintextPassword = req.body.passwrd;
    const myMobile = req.body.mobile;

    const mob = await db.table("customer").filter({ mobile: myMobile }).get();
    if (mob) {
      console.log(myPlaintextPassword);
      console.log(mob.passwrd);
      const match = await bcrypt.compare(myPlaintextPassword, mob.passwrd);

      if (match) {
        req.mobile = mob.mobile;
        next();
      } else {
        res.status(401).send("Password incorrect");
      }
    } else {
      res.status(401).send("Mobile incorrect");
    }
  },

  isPasswordAndMobileMatchTrainer: async (req, res, next) => {
    const myPlaintextPassword = req.body.passwrd;
    const myMobile = req.body.mobile;

    const mob = await db.table("trainer").filter({ mobile: myMobile }).get();
    if (mob) {
      console.log(myPlaintextPassword);
      console.log(mob.passwrd);
      const match = await bcrypt.compare(myPlaintextPassword, mob.passwrd);

      if (match) {
        req.mobile = mob.mobile;
        next();
      } else {
        res.status(401).send("Password incorrect");
      }
    } else {
      res.status(401).send("Mobile incorrect");
    }
  },
};
