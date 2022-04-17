const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const router = express.Router();

const path1 = __dirname + "/views/";

app.use(express.static(path1));

// const http = require('http')
// // const hostname = '216.10.245.232';
const hostname = "localhost";

const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World! NodeJS \n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", function (req, res) {
  res.sendFile(path1 + "index.html");
});

const auth = require("./middleware/jwtauth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Shop API",
      description: "Backend Api",
      contact: {
        name: "Amazing Developer",
      },
      // servers: "http://localhost"
      servers: "http://216.10.245.232:3000",

      // http://216.10.245.232:3000
    },
  },
  apis: ["app.js", ".routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("hello world");
});

/* CORS */

app.use(
  cors({
    credentials: true,
    origin: ["*", "http://dev.zonxo.com/"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const coursesRouter = require("./routes/courses");
const eventsRouter = require("./routes/events");
const categoryRouter = require("./routes/category");
const tagsRouter = require("./routes/tags");
const trainersRouter = require("./routes/trainers");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/order");
const quoteRouter = require("./routes/quote");
const customerRouter = require("./routes/customer");

const fileRouter = require("./routes/file");
const filecorsRouter = require("./routes/cour_file");

// Define Routes
/**
 * @swagger
 * /api/products:
 *   get:
 *    description: Get All Products
 *
 */

app.use("/api/courses", coursesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/trainers", trainersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/quote", quoteRouter);
app.use("/api/customer", customerRouter);

app.use("/api/file", fileRouter);
app.use("/api/file", filecorsRouter);

module.exports = app;
