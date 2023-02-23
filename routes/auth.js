const express = require("express");
const router = express.Router();

// Redirect the user to the Google signin page
const passport = require("../passportConfig");
const { findUserByGoogleId, createUser } = require("../userModel");
const jwt = require("jsonwebtoken");

router.get("/", passport.authenticate("google", { scope: ["email", "profile"] }));
// Retrieve user data using the access token received
router.get("/callback", passport.authenticate("google", { session: false }), async (req, res) => {
	try {
		const user = await findUserByGoogleId(req.user.google.id);
		console.log("t1");
		if (!user) {
			// User doesn't exist in database, add them
			const newUser = {
				google: {
					id: req.user.google.id,
					name: req.user.google.name,
					email: req.user.google.email
				}
			};
			console.log("t2");
			await createUser(newUser);
		}
		console.log("t3");
		// Generate JWT token for the user
		jwt.sign({ user: req.user }, "secretKey", { expiresIn: "1h" }, (err, token) => {
			if (err) {
				return res.json({
					token: null
				});
			}
			res.json({
				token
			});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
