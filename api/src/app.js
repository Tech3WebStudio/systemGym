const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const debug = require('debug')('app');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");

server.name = "API";
debug('Iniciando la aplicación...');
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
    cors({
      origin: ["http://localhost:5173"], 
      credentials: true,
    })
  );
server.use(router);
server.use(invalidRoute);
server.use((err, req, res, next) => {
  console.error(err.stack); // Log del error
  res.status(500).json({ error: err.message }); // Respuesta al cliente
});

module.exports = server;
