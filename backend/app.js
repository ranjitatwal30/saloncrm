"use strict";

var express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");
var https = require("https");
var url = require("url");
var fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./app/swagger/swagger.json");
var cors = require("cors");
//const cron = require("node-cron");
//var logger = require("./app/lib/logger");

global.__rootRequire = function(relpath) {
  return require(path.join(__dirname, relpath));
};

global.__debug = function() {
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === "local" ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "aws"
  ) {
  }
};

var app = express();
app.use(cors());
app.use(fileUpload());

app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//process.env.NODE_ENV = process.env.NODE_ENV || "local"; //local server
process.env.NODE_ENV = process.env.NODE_ENV || "staging"; //staging server
// process.env.NODE_ENV = process.env.NODE_ENV || 'dev';    //dev server (dev.mdout.com)
// process.env.NODE_ENV = process.env.NODE_ENV || 'prod';    //prod server (mdout.com)

const config = require("./app/config/config.js").get(process.env.NODE_ENV);
require("./app/config/db");

app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// routes
app.use("/uploads", express.static(path.join(__dirname, "./app/uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/modules/dashboard")));
app.use(express.static(path.join(__dirname, "public/dist")));
// All api requests
app.use(function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use("/api/v1", require("./app/api/v1/routes")(express));

// start server
var port = process.env.PORT || config.port;
app.listen(port).timeout = 1800000; //30 min
console.log("Available on:", config.backendBaseUrl);
//logger.info("Listening on " + config.backendBaseUrl);