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

// create app
const app = express();
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(cookieParser());

app.set(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(translationMiddleware);

app.use(routes);

app.use("*", (req, res, next) => {
  const error = new Error("METHOD NOT ALLOWED!!");
  next(error);
  // next(throw nee Er)
});

app.use(ErrorHandler);
// create server
const server = http.createServer(app);

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
