const express = require("express");
const path = require('path');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");


const users = require("./routes/api/users");
const skills = require("./routes/api/skills");

const app = express();
// // Load in the environment
dotenv.config();

// Access port from .env file
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());




// Connect to db
const uri = process.env.LEVELUP_DB_URI; 
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(port));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection established sucessfully");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/users", skills);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/levelup/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "levelup", "build", "index.html"))
  });
} else {
    app.get("/", (req, res) => {
      res.send("Api running");
    })
}
