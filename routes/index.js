const express = require('express');

const User = require("../models/user-model.js");

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // "req.user" comes from Passport's "deserializeUser()"
  // (it's the document of the currently logged in user)
  if (req.user) {
    console.log("LOGGED IN! 😎");
  }
  else {
    console.log("Logged OUT... 😢");
  }

  res.render("index.hbs");
});

router.get("/settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You have to be logged to visit User Settings! 😤");
    res.redirect("/login");
  }
  else {
    res.render("settings-page.hbs");
  }
});

router.post("/process-settings", (req, res, next) => {
  const { fullName, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id, // get the logged in user's ID using Passport's "req.user"
    { $set: { fullName, email } },
    { runValidators: true },
  )
    .then(userDoc => {
      // save a flash message to display in the HOME page
      req.flash("success", "Settings saved! 😏");
      res.redirect("/");
    })
    .catch(err => next(err));
});


module.exports = router;
