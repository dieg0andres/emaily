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
    callbackURL: "/auth/google/callback",
    proxy: true
  },

  async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({ googleID: profile.id })

    if (existingUser) {
      // we already have a record w/ given googleID
      console.log('user already exists, verified with Google Strategy', existingUser)
      return done(null, existingUser);

    }
    // don't have a user record with googleID
    const user = await new User({ googleID: profile.id }).save()
    done(null, user);
    console.log("new user created using Google Strategy");

  }
));
