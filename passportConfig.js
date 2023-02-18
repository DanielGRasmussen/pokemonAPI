const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.DB_URI;

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const findUserByGoogleId = async (googleId) => {
	try {
		const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		await client.connect();
		const collection = client.db().collection("users");
		return await collection.findOne({ "google.id": googleId });
	} catch (error) {
		console.error(error);
		return null;
	}
};

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: "http://localhost:8080/auth/google/callback",
				passReqToCallback: true
			},
			async (request, accessToken, refreshToken, profile, done) => {
				try {
					let existingUser = await findUserByGoogleId(profile.id);
					// if user exists return the user
					if (existingUser) {
						return done(null, existingUser);
					}
					// if user does not exist create a new user
					console.log("Creating new user...");
					const newUser = {
						method: "google",
						google: {
							id: profile.id,
							name: profile.displayName,
							email: profile.emails[0].value
						}
					};
					const client = new MongoClient(uri, {
						useNewUrlParser: true,
						useUnifiedTopology: true
					});
					await client.connect();
					const collection = client.db().collection("users");
					const result = await collection.insertOne(newUser);
					newUser._id = result.insertedId;
					return done(null, newUser);
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromHeader("authorization"),
				secretOrKey: "secretKey"
			},
			async (jwtPayload, done) => {
				try {
					const user = jwtPayload.user;
					done(null, user);
				} catch (error) {
					done(error, false);
				}
			}
		)
	);
};
