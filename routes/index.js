const express = require('express');

const User = require("../models/user-model.js");
const fileUploader = require("../config/file-uploader.js");

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

// "avatarUpload" is our file input's name attribute
router.post("/process-settings",
  fileUploader.single("avatarUpload"),
  (req, res, next) => {
  const { fullName, email } = req.body;
  let avatar;

  // multer stores the file information in "req.file"
  if (req.file) {
    avatar = req.file.secure_url;
  }

  User.findByIdAndUpdate(
    req.user._id, // get the logged in user's ID using Passport's "req.user"
    { $set: { fullName, email, avatar } },
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
