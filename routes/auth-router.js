const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();


router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, originalPassword } = req.body;

  // encrypt the submitted password
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(userDoc => {
      // save a flash message to display in the HOME page
      req.flash("success", "Sign up success! 🖖🏾");
      res.redirect("/")
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  // first check to see if there's a document with that email
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // save a flash message to display in the LOGIN page
        req.flash("error", "Incorrect email. 🤦‍♂️");
        res.redirect("/login");
        return; // use "return" instead of a big "else {}"
      }

      // second check the password
      const { encryptedPassword } = userDoc;
      // "compareSync()" will return false if the "originalPassword" is wrong
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        // save a flash message to display in the LOGIN page
        req.flash("error", "Password is wrong. ️🤯");
        res.redirect("/login");
        return;
      }

      // save a flash message to display in the HOME page
      req.flash("success", "Log in success! 🧙‍♀️");
      // go to the home page if password is GOOD (log in worked!)
      res.redirect("/");
    })
    .catch(err => next(err));
});


module.exports = router;
