const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // This defines the log message in dev mode in console
}

// parse the request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// loading the assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./routes/router"));

app.set("view engine", "ejs");

dotenv.config({ path: "config.env" });

// This calles the port from config,env file
connectDB();

const PORT = process.env.PORT || 5000; //this defines the port where the server runs

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
); // This listens to port 5000
