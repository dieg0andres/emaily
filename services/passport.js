const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOne({ googleID:profile.id })
      .then((existingUser) => {
        if(existingUser) {
          // we already have a record w/ given googleID
          console.log('user already exists', existingUser)
          cb(null, existingUser);

        }
        else {
          // don't have a user record with googleID
          new User({ googleID: profile.id }).save()
            .then(user => cb(null, user));
          console.log("new user created");
        }
      });
  }
));
