const express = require("express");

const Room = require("../models/room-model.js");

const router = express.Router();


router.get("/my-rooms", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see your rooms. 🤬");
    res.redirect("/login");
    return; // use "return" instead of a big "else {}"
  }

  // Find rooms owned by the logged in user
  Room.find({ owner: { $eq: req.user._id } })
    .sort({ createdAt: -1 }) // use ".sort()" to order results (-1 for reverse)
    .then(roomResults => {
      res.locals.roomArray = roomResults;
      res.render("room-views/room-list.hbs");
    })
    .catch(err => next(err));
});

router.get("/room/add", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to add a room. 😡");
    res.redirect("/login");
  }
  else {
    res.render("room-views/room-form.hbs");
  }
});

router.post("/process-room", (req, res, next) => {
  const { name, description, pictureUrl } = req.body;
  const owner = req.user._id;

  Room.create({ name, description, pictureUrl, owner })
    .then(roomDoc => {
      req.flash("success", "Room created successfully! 🤓");
      res.redirect("/my-rooms");
    })
    .catch(err => next(err));
});


module.exports = router;
