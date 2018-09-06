const passport = require("passport");
const SlackStrategy = require("passport-slack").Strategy;

const User = require("../../models/user-model.js");


passport.use(new SlackStrategy({
  // settings for the Slack strategy
  clientID: "2432150752.431389884199",
  clientSecret: "2e925f12a0d9dbbad2b723b756247ea9",
  callbackURL: "/slack/user-info",
  proxy: true, // need this for production version to work 🤷‍♀️
}, (accessToken, refreshToken, userInfo, done) => {
  // function that runs whenever a user logs in successfully
  console.log("SLACK user info ----------------------------", userInfo);
}));
