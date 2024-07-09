const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");

server.name = "API";
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

module.exports = server;
