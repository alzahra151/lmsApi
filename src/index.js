require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
const routes = require("./routes");
const translationMiddleware = require("./translations");
const ErrorHandler = require("./middleware's/errorHandler");
const setupSocketServer = require('./controller/socket');
// create app
const app = express();
app.use(cors());
// HELMET Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self' data:", '*.google-analytics.com', '*.vimeocdn.com'],
      'script-src': ["'self'", '*.polyfill.io', "'unsafe-eval'", "'unsafe-inline'"],
      'default-src': ["'self'", '*.google-analytics.com', '*.gstatic.com', '*.googleapis.com', 'vimeo.com', '*.vimeo.com']
    }
  })
);
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});
app.use(cookieParser());

app.set(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json());
app.use(translationMiddleware);

app.use(routes);

app.use("*", (req, res, next) => {
  const error = new Error("METHOD NOT ALLOWED!!");
  next(error);
  // next(throw nee Er)
});

app.use(ErrorHandler);
// create server***
const server = http.createServer(app);
// setupSocketServer(server, {
//   cors: {
//     origin: '*', // Allow all origins
//     methods: ['GET', 'POST'],
//   },
// });

async function connectToDatabase() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: false, alter: true });
    console.log("database connected successfully");
  } catch (error) {
    console.log("error during connecting to database");
    console.log(error);
    server.close();
  }
}

server.listen(port, "0.0.0.0", () => {
  console.log("application running");
  connectToDatabase();
});
