let database = require("./database.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

// Loading BCrypt
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

// Loading Controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

// Loading Express.js
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable CORS
app.use(cors());

app.get("/", (req, res) => {
  console.log(database.users);
  res.send("This is working!");
});

app.get("/profile/:userId", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, salt);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleAPICall(req, res);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

/* 
/ --> res = this is working
/signin           --> POST  res: success/fail
/register         --> POST  res: new user object
/profile/:userId  --> GET   res: current user 
/image            --> PUT   res: current user with the updated entries
*/
