//Este modulo tiene la responsabilidad de crear el servidor

const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(cors());

server.use(morgan("dev"));
server.use((rec, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow_Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(express.json());
server.use(router);

module.exports = server;

/*
server.use((req, res, next) => {
  console.log("Estoy por el middleware");
  next();
});
*/
