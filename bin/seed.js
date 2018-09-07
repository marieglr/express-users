const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

mongoose
  .connect('mongodb://localhost/express-users', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const userData = [
  {
    fullName: "Greg Gardener",
    email: "g@g.g",
    encryptedPassword: bcrypt.hashSync("ggggg0", 10),
    role: "admin",
  },
  {
    fullName: "ABy Gardener",
    email: "ghdj@us.g",
    encryptedPassword: bcrypt.hashSync("ggggg0", 10),
    role: "admin",
  }
];


User.create(userData)
  .then(userResults => {
    console.log(`Created ${userResults.length} USERS 🤠`);
  })
  .catch(err => {
    console.log("Admin CREATE error 💩", err);
  });
