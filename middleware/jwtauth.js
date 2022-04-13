const jwt = require("jsonwebtoken");
const createError = require('http-errors')

const config = process.env;

// const validJWTNeeded = (req, res, next) => {
//     if (req.headers['authorization']) {
//         try {
//             let authorization = req.headers['authorization'].split(' ');
//             if (authorization[0] !== 'Bearer') {
//                 return res.status(401).send();
//             } else {
//                 req.jwt = jwt.verify(authorization[1], secret);
//                 return next();
//             }
//         } catch (err) {
//             return res.status(403).send("Authentication faileds");
//         }
//     } else {
//         return res.status(401).send("No authorization header found.");
//     }
// }

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();

// };



// function verifyToken(req, res, next) {
//   if(!req.headers.authorization) {
//     return res.status(401).send('Unauthorized request')
//   }
//   let token = req.headers.authorization.split(' ')[1]
//   if(token === 'null') {
//     return res.status(401).send('Unauthorized request')
//   }
//   let payload = jwt.verify(token, 'Xenfe1$-secret')
//   if(!payload) {
//     return res.status(401).send('Unauthorized request')
//   }
//   req.userId = payload.subject
//   next()
// }


const verifyAccessToken= (req, res, next) => {
  if (!req.headers['authorization']) return res.json({auth: false});
  // next(createError.Unauthorized())
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ')
  const token = bearerToken[1]
  jwt.verify(token, 'Xenfe1$-secret', (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return     res.json({auth: false});
      // next(createError.Unauthorized(message))
    }
    req.payload = payload
    next()
  })
}

module.exports = verifyAccessToken