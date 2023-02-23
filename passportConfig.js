const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const passport = require("passport");

// Define Google OAuth2 strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/callback"
		},
		function (accessToken, refreshToken, profile, cb) {
			// This function is called when a user successfully logs in via Google OAuth
			return cb(null, profile);
		}
	)
);

// Serialize and deserialize the authenticated user
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = passport;
