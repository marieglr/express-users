const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../../models/user-model.js");


passport.use(new GoogleStrategy({
  // settings for the Google strategy
  clientID: "22017745265-7stgueqkubrjqlsk0r9htsddrkp27c8r.apps.googleusercontent.com",
  clientSecret: "R-bTupakyc8GMpXceRMzEw-L",
  callbackURL: "/google/user-info",
  proxy: true, // need this for production version to work 🤷‍♀️
}, (accessToken, refreshToken, userInfo, done) => {
  // function that runs whenever a user authorizes us to use their Google info
  console.log("GOOGLE user info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~", userInfo);

  const { displayName, emails } = userInfo;

  User.findOne({ email: { $eq: emails[0].value } })
    .then(userDoc => {
      if (userDoc) {
        // log them in if we found an account already
        // "null" in the 1st argument tells Passport that there is "null" errors
        done(null, userDoc);
        return;
      }

      // otherwise create a new user account for them
      User.create({ fullName: displayName, email: emails[0].value })
        .then(userDoc => {
          // log in with the new account
          // "null" in the 1st argument tells Passport that there is "null" errors
          done(null, userDoc);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));
