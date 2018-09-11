/*const passport = require("passport");
const SlackStrategy = require("passport-slack").Strategy;

const User = require("../../models/user-model.js");


passport.use(new SlackStrategy({
  // settings for the Slack strategy
  clientID: process.env.SLACK_ID,
  clientSecret: process.env.SLACK_SECRET,
  callbackURL: "/slack/user-info",
  proxy: true, // need this for production version to work 🤷‍♀️
}, (accessToken, refreshToken, userInfo, done) => {
  // function that runs whenever a user authorizes us to use their Slack info
  console.log("SLACK user info ----------------------------", userInfo);

  const { name, email } = userInfo.user;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (userDoc) {
        // log them in if we found an account already
        // "null" in the 1st argument tells Passport that there is "null" errors
        done(null, userDoc);
        return;
      }

      // otherwise create a new user account for them
      User.create({ fullName: name, email })
        .then(userDoc => {
          // log in with the new account
          // "null" in the 1st argument tells Passport that there is "null" errors
          done(null, userDoc);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));
*/